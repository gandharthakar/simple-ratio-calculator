
// Globals

let lstm_key = 'theme-mode';

function check_theme_mode_on_page_load() {
    let all_opts = $('.js-theme-mod');
    let ls_tmod = localStorage.getItem(lstm_key);
    if(!ls_tmod) {
        let tmod = '';
        localStorage.setItem(lstm_key, JSON.stringify(tmod));
    } else {
        all_opts.removeClass('active');
        let ls_gtmod = JSON.parse(localStorage.getItem(lstm_key));
        if(ls_gtmod == '') {
            $("html").removeAttr('theme-mode');
            all_opts.eq(0).addClass('active');
        } else if(ls_gtmod == 'light') {
            $("html").attr('theme-mode', 'light');
            all_opts.eq(1).addClass('active');
        } else {
            $("html").attr('theme-mode', 'dark');
            all_opts.eq(2).addClass('active');
        }
    }
}

// --> START DOM.Ready();
$(function(){

    // Check Theme Mode On Page Load.
    check_theme_mode_on_page_load();

    // Toggle Theme Mode.
    $('.js-theme-mod').on('click', function(){
        // Remove 'Active' Class From All Items.
        $('.js-theme-mod').removeClass('active');

        // Add 'Active' Class On Current Clicked Item.
        $(this).addClass('active');

        // Get Theme String
        let theme = $(this).attr('data-prefered-theme');

        // Set Theme 
        if(theme == '') {
            $("html").removeAttr('theme-mode');
        } else if(theme == 'light') {
            $("html").attr('theme-mode', 'light');
        } else {
            $("html").attr('theme-mode', 'dark');
        }

        // Save Theme In LocalStorage for Page Refresh.
        localStorage.setItem(lstm_key, JSON.stringify(theme));
    });

    function validate_input(input, error, maxLength) {
        let maxl = maxLength !== null ? maxLength : null;
        if(input.val() == '') {
            error.show();
            error.text('Please Enter Value');
            input.removeClass('valid');
        } else if(maxl !== null && input.val().length > maxl) {
            error.show();
            error.text('Please Enter Maximum ' + maxl + ' Numbers.');
            input.removeClass('valid');
        } else if(isNaN(input.val())) {
            error.show();
            error.text('Please Enter Numbers Only.');
            input.removeClass('valid');
        } else {
            error.hide();
            error.text('');
            input.addClass('valid');
        }
    }

    $('.js-finp-1').on('keyup', function(){
        let err = $(this).parent().find('.js-error-msg');
        validate_input($(this), $(err), 3);
    });

    $('.js-finp-2').on('keyup', function(){
        let err = $(this).parent().find('.js-error-msg');
        validate_input($(this), $(err), 3);
    });

    $('.js-finp-3').on('keyup', function(){
        let err = $(this).parent().find('.js-error-msg');
        validate_input($(this), $(err), null);
    });

    function validate_form() {
        validate_input($('.js-finp-1'), $('.js-error-i1e1-msg'));
        validate_input($('.js-finp-2'), $('.js-error-i2e1-msg'));
        validate_input($('.js-finp-3'), $('.js-error-i3e1-msg'));
    }

    function check_form_validity() {
        let totalFrmElm = $('.js-finp').length;
        let validFrmElms = $('.js-finp.valid').length;
        let isValid = false;
        if(validFrmElms == totalFrmElm) {
            isValid = true;
        }
        return isValid;
    }

    function reset_form() {
        // Empty All Inputs.
        $('.js-finp').val('');

        // Hide All Error Messages.
        $('.js-error-msg').hide();
        $('.js-error-msg').text('');
    }

    function total_x(inp1, inp2, inp3) {
        let calc = Number(inp3) / (Number(inp1) + Number(inp2));
        return calc.toFixed(2);
    }

    function generate_result(inp1, inp2, inp3) {
        let res = $("#result");
        let html_temp = `<div class="result-content">
        <p>
            Calculation - ${inp1.val()}:${inp2.val()} of ${inp3.val()}
        </p>
        <p>
            ${inp1.val()}x + ${inp2.val()}x = ${inp3.val()} <br />
            ${Number(inp1.val()) + Number(inp2.val())}x = ${inp3.val()} <br />
            x = ${inp3.val()} / ${Number(inp1.val()) + Number(inp2.val())} <br />
            x = ${total_x(inp1.val(), inp2.val(), inp3.val())}
        </p>
        <p>
            ${inp1.val()}x = ${inp1.val()} x (x = ${total_x(inp1.val(), inp2.val(), inp3.val())}) = ${Number(inp1.val()) * total_x(inp1.val(), inp2.val(), inp3.val())} <br />
            ${inp2.val()}x = ${inp2.val()} x (x = ${total_x(inp1.val(), inp2.val(), inp3.val())}) = ${Number(inp2.val()) * total_x(inp1.val(), inp2.val(), inp3.val())}
        </p>
    </div>`;
    res.html(html_temp);
    }

    // Calculate Form on Button.
    $("#calculate-form").on('submit', function(e){
        e.preventDefault();
        validate_form();
        let isValidForm = check_form_validity();
        if(isValidForm) {
            generate_result($('.js-finp-1'), $('.js-finp-2'), $('.js-finp-3'));
            reset_form();
        }
    });

    // Reset Calculator.
    $("#reset-calc").on('click', function(e){
        e.preventDefault();
        // Reset Calculator Form.
        reset_form();
        // Reset Result Screen.
        $("#result").html('');
    });

}); // <-- End od DOM.Ready();
function post(api_url, data, success_callback, fail_callback) {

    $.ajax({
        method: 'POST',
        url: api_url,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            success_callback(response);
        },
        error: function(response) {
            fail_callback(response);
        }
    });
    }
    
    function submit_email_to_waitlist(){
        // fetch values from the frontend
        var new_signup;
        if (!mobile)
        {
            new_signup = document.getElementById('waitlist_email').value; //fetch user signing up on frontend
        }
        else
        {
            new_signup = document.getElementById('waitlist_email_mobile').value; //fetch user signing up on frontend
        }
        
        var current_url = document.URL; //fetch current URL, including potential referral token
    
        const success_callback = function(response) {
            // fetching responses
            waiter_email = response['registered_email']
            waiter_priority = response['current_priority']
            total_waiters_currently = response['total_waiters_currently']
            referral_link = response['referral_link']
    
            // hiding parts of HTML
            $('#waitlist_email').hide()
            $('#waitlist_email_mobile').hide()
            $('#submit_button').hide()
            $('#submit_button_mobile').hide()
            $('#email_address_text').hide()
            $('#email_address_text_mobile').hide()

            $('p.error_message').html("Thank you!");
        };
    
        const fail_callback = function(response) {
    
            // perform actions based on error codes
            response_code = response['status']
            if (response_code == 422) {
                $('p.error_message').html("Invalid email");
            } else if (response_code == 400) {
                $('p.error_message').html("Invalid email");
            }
        };
    
        post('https://www.getwaitlist.com/waitlist',
            {email: new_signup,
                api_key: 'U53254',
                referral_link: current_url
            }, success_callback, fail_callback);
    };
    
                        
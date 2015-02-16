/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('TY5mt93xRB_Z58yy4sHGeg');
var fs = require('fs-extra');
exports.sendInviteMail = function (res, email, messageHtml, messageSubject) {
    var message = {
        "html": messageHtml,
        "subject": messageSubject,
        "from_email": "admin@nastraq.com",
        "from_name": "Web Team",
        "to": [{
            "email": email,
            "name": "User",
            "type": "to"
        }],
        "headers": {
            "Reply-To": "admin@nastraq.com"
        },
        "important": true,
        "track_opens": null,
        "track_clicks": true,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": "admin@nastraq.com",
        "return_path_domain": null,
        "tags": [
            "invite-signup"
        ],
        "merge": true
    };
    mandrill_client.messages.send({ "message": message, "async": false }, function (result) {
        var msg = result[0].status + " to " + result[0].email;
        /*
         [{
         "email": "recipient.email@example.com",
         "status": "sent",
         "reject_reason": "hard-bounce",
         "_id": "abc123abc123abc123abc123abc123"
         }]
         */
    }, function (e) {
// Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
};
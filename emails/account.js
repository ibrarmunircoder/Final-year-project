const sgMail = require('@sendgrid/mail');

const sendgridAPIKey =  process.env.API_KEY || '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';

sgMail.setApiKey(sendgridAPIKey);

// sgMail.send({
//     to: 'ibrarmunir56@outlook.com',
//     from: 'ibrarmunir009@gmail.com',
//     subject: 'Thanks for joining us',
//     text: 'Welcome to the platform'
// });
const sendInvestorEmail = (email, startup) => {
    sgMail.send({
        to: email,
        from: 'ibrarmunir009@gmail.com',
        subject: 'Startup is connecting with you',
        text: `The Startup, ${startup.startupName}, wants to connect with you. The Startup information is given below:
        Email: ${startup.email},
        Startup_Summary: ${startup.startup_summary},
        Location: ${startup.city}, ${startup.country},
        Target Investment: ${startup.total_amount},
        Per_Investor: ${startup.per_investor}`
    });
}

const sendStartupEmail = (email, investor) => {
    sgMail.send({
        to: email,
        from: 'ibrarmunir009@gmail.com',
        subject: 'Investor is connecting with you',
        text: `The Startup, ${investor.investorName}, wants to connect with you. The Startup information is given below:
        Email: ${investor.email},
        Professional_background: ${investor.professional_bg},
        Location: ${investor.city}, ${investor.country},
        Maximum Investment: ${investor.Max_Investment},
        Minimum Investment: ${investor.Min_Investment}`
    });
}

module.exports = {
    sendInvestorEmail,
    sendStartupEmail
}
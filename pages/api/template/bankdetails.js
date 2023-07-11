const bankdetails = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee bank details</title>
</head>
<body>
    <h1>Hi,</h1><br>
    <p>Please find the employee bank details below and the attachments,</p>
    <ul>
        <li>Employee code: {{employee_code}}</li>
        <li>Employee email: {{employee_email}}</li>
        <li>Employee name: {{employee_name}}</li>
        <li>Account type: {{account_type}}</li>
        <li>IFSC code: {{ifsc}}</li>
        <li>Branch: {{branch}}</li>
        <li>Bank name: {{bank_name}}</li>
        <li>Account number: {{account_number}}</li>
        <li>Account status: {{account_status}}</li>
        {{#if reason_for_rejection}}
            <li>Reason for rejection: {{reason_for_rejection}}</li>
        {{/if}}
    </ul>
</body>
</html>
`;

module.exports = bankdetails;

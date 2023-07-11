const send_employer_document = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p><strong>Hi, {{username}}</strong></p>
    <p>Your requested document is {{document_name}}!</p>
    <p>Please find the attachment with this mail.</p>
</body>
</html>
`;

module.exports = send_employer_document;

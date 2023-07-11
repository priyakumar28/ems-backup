const emp_designation_change = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Dear, {{employee_name}}</h1><br>
    <p>This is a mail to notify that your current employment status have been changed from <strong>{{previous_employee_status}}</strong> to <strong>{{new_employee_status}}</strong></p>
</body>
</html>
`;

module.exports = emp_designation_change;

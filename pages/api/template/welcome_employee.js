const welcome_employee = `
<!DOCTYPE html>
<html style="box-sizing: border-box;">
    <head> </head>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <style type="text/css">
            * {
                text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                -moz-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
            html {
                height: 100%;
                width: 100%;
            }
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                mso-line-height-rule: exactly;
            }
            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
            }
            .ReadMsgBody,
            .ExternalClass {
                width: 100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            .ExternalClass div {
                line-height: 100%;
            }
        </style>
        <!--[if gte mso 9]>
        <style type="text/css">
            li { text-indent: -1em; }
            table td { border-collapse: collapse; }
        </style>
        <![endif]-->
        <title> </title>
        <style>
            @font-face {
                font-family: "Anton";
                src: url({{host_url}}/fonts/Anton-Regular.ttf);
            }
        </style>
        <!-- content -->
        <title>BAssure Solutions - Employee Management System</title>
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
    </head>
    <body class="body" style="box-sizing: border-box; margin: 0; width: 100%;position: relative;">
        <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; box-sizing: border-box; margin: 0;">
            <tr style="box-sizing: border-box;">
                <td class="body__content" align="left" width="100%" valign="top" style="box-sizing: border-box; color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px;">
                    <div style="box-sizing: border-box; max-width: 640px; margin: 0 auto;">
                        <div style="box-sizing: border-box; position: relative; background: url({{host_url}}/images/bg.svg); height: 30vh; background-size: 100%; background-repeat: no-repeat;"> 
                            <img src="{{host_url}}/images/logo.svg" border="0" alt="BAssure Solutions" title="BAssure Solutions" class="img__block" style="box-sizing: border-box; display: block; max-width: 100%; position: absolute; top: 15px; left:15px" width="46" height="47"/> 
                        </div>
                        <div style="box-sizing: border-box; text-align: center; margin-top: 60px;">
                            <h1 class="header h1" style="box-sizing: border-box; color: #134097; font-family: 'Anton'; font-size: 40px; font-style: normal; font-weight: 400; letter-spacing: .03em; line-height: 60px; margin: 0;"> Welcome to BAssure</h1>
                            <div style="box-sizing: border-box; width: 319px; height: 1px; margin: 10px auto; background: #FF8412;"> </div>
                            <p class="text p" style="display: block; margin: 14px 0; box-sizing: border-box; color: #299BED; line-height: 19px; text-transform: uppercase; font-family: 'Open Sans'; font-size: 14px; font-style: normal; font-weight: 400;"> Your ultimate digital innovation partner</p>
                        </div>
                        <div style="box-sizing: border-box; max-width: 520px; margin: 37px auto;">
                            <p class="text p" style="display: block; margin: 14px 0; box-sizing: border-box; font-family: 'Open Sans'; font-size: 14px; font-style: normal; font-weight: 400; color: #134097; line-height: 20px;"> We are delighted to have you on board <strong style="box-sizing: border-box;">Employee Management System</strong> by BAssure Solutions Pvt Ltd. ! To activate your new account, please use the below credentials.</p>
                            <div style="box-sizing: border-box;">
                                <ul class="text ul" style="margin-left: 20px; margin-top: 16px; margin-bottom: 16px; list-style-type: disc; color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; box-sizing: border-box; width: 190px; padding: 0; list-style: none; margin: 16px auto 0;">
                                    <li class="text li" style="box-sizing: border-box; color: #134097; font-size: 14px; line-height: 19px; font-family: 'Open Sans'; font-style: normal;"><strong style="box-sizing: border-box;">Email:</strong> {{email}}</li>
                                </ul>
                            </div>
                            <div style="box-sizinsg: border-box; background: #1FA2FF; border-radius: 10px; width: 325px; margin: 39px auto 0 auto; display: block; text-align: center; padding: 10px;">
                                <a href="{{host_url}}" class="a" style="box-sizing: border-box; font-style: normal; font-family: 'Open Sans'; line-height: 22px; letter-spacing: .02em; font-weight: 600; font-size: 16px; color: #FFFFFF; text-decoration: none;"><span class="a__text" style="box-sizing: border-box; color: #FFFFFF; text-decoration: none;">Login with EMS</span></a>
                            </div>
                        </div>
                        <div style="box-sizing: border-box; position: relative; background: url({{host_url}}/images/bottom.svg); height: 280px; background-size: cover; padding-top: 120px;">
                            <ul class="text ul" style="margin-left: 20px; list-style-type: disc; color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; box-sizing: border-box; padding: 0; list-style: none; margin-bottom: 0; margin-top: 16px; text-align: center;">
                                <li class="text li" style="box-sizing: border-box; padding: 0 13px; color: #134097; display: inline-block; font-family: 'Open Sans'; font-size: 14px; font-style: normal; font-weight: 500; line-height: 19px;"><a href="https://www.bassure.com/privacy-policy/" class="a" style="box-sizing: border-box;"><span class="a__text" style="box-sizing: border-box;">Privacy policy</span></a></li>
                                <li class="text li" style="box-sizing: border-box; padding: 0 13px; color: #134097; display: inline-block; font-family: 'Open Sans'; font-size: 14px; font-style: normal; font-weight: 500; line-height: 19px;">|</li>
                                <li class="text li" style="box-sizing: border-box; padding: 0 13px; color: #134097; display: inline-block; font-family: 'Open Sans'; font-size: 14px; font-style: normal; font-weight: 500; line-height: 19px;"><a href="https://www.bassure.com/cookie_policy/" class="a" style="box-sizing: border-box;"><span class="a__text" style="box-sizing: border-box;">Cookie policy</span></a></li>
                            </ul>
                            <ul class="text ul" style="margin-left: 20px; list-style-type: disc; color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; box-sizing: border-box; padding: 0; list-style: none; margin-bottom: 0; margin-top: 25px; text-align: center;">
                                <li class="text li" style="box-sizing: border-box; padding: 0 13px; color: #134097; display: inline-block; font-family: 'Open Sans'; font-size: 12px; font-style: normal; font-weight: 400; line-height: 16px; text-transform: capitalize;"><a href="https://www.facebook.com/bassuresolutions" class="a" style="box-sizing: border-box; text-decoration: none;"><span class="a__text" style="box-sizing: border-box; text-decoration: none;"><img src="{{host_url}}/images/fb.svg" border="0" alt="Facebook" title="Facebook" class="img__block" style="box-sizing: border-box; display: block; max-width: 100%;" width="31" height="31"/></span></a></li>
                                <li class="text li" style="box-sizing: border-box; padding: 0 13px; color: #134097; display: inline-block; font-family: 'Open Sans'; font-size: 12px; font-style: normal; font-weight: 400; line-height: 16px; text-transform: capitalize;"><a href="https://twitter.com/BAssureSolution" class="a" style="box-sizing: border-box; text-decoration: none;"><span class="a__text" style="box-sizing: border-box; text-decoration: none;"><img src="{{host_url}}/images/twitter.svg" border="0" alt="Twitter" title="Twitter" class="img__block" style="box-sizing: border-box; display: block; max-width: 100%;" width="31" height="31"/></span></a></li>
                                <li class="text li" style="box-sizing: border-box; padding: 0 13px; color: #134097; display: inline-block; font-family: 'Open Sans'; font-size: 12px; font-style: normal; font-weight: 400; line-height: 16px; text-transform: capitalize;"><a href="https://www.linkedin.com/company/bassure-solutions" class="a" style="box-sizing: border-box; text-decoration: none;"><span class="a__text" style="box-sizing: border-box; text-decoration: none;"><img src="{{host_url}}/images/linkedin.svg" border="0" alt="Linkedin" title="Linkedin" class="img__block" style="box-sizing: border-box; display: block; max-width: 100%;" width="31" height="31"/></span></a></li>
                            </ul>
                            <p class="text p" style="display: block; margin: 14px 0; box-sizing: border-box; color: #134097; font-family: 'Open Sans'; font-size: 10px; font-style: normal; font-weight: 400; line-height: 14px; margin-bottom: 0; margin-top: 13px; text-align: center; text-transform: capitalize;">
                                &copy; 2022 BAssure Solutions Pvt Ltd.
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <div style="box-sizing: border-box; display: none; white-space: nowrap; font-size: 15px; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
    </body>
</html>
`;

module.exports = welcome_employee;

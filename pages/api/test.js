const axios = require('axios').default;

export default async (req, res) => {
    try {
        const {
            body: {
                email
            }
        } = req;

        const userFound = await findUserInAzure(email);
        
        return res.status(200).json(userFound);
    } catch (error) {
        res.status(200).json(error);
    }
};

const getTokenFromAzure = async () => {
    return new Promise((resolve, reject) => {
        const postData = {
            client_id: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
            scope: process.env.AZURE_AD_SCOPE,
            client_secret: process.env.AZURE_AD_CLIENT_SECRET,
            grant_type: process.env.AZURE_AD_GRANT_TYPE
        };
        axios({
            method: 'POST',
            url: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT}/oauth2/v2.0/token`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: Object.keys(postData).map((key, index) => `${key}=${encodeURIComponent(postData[key])}`).join('&')
        }).then(response => {
            let { status, data } = response;
            if (status === 200) {
                resolve({ status, data });
            }
            reject({ status: 400, message: "Error occured" });
        }).catch(error => {
            reject({ status: 400, message: "Error occured" });
        });
    });
}

const findUserInAzure = async (email) => {
    const { status, data: { access_token } } = await getTokenFromAzure();
    if (status === 200) {
        return new Promise((resolve, reject) => {
            axios({
                url: `https://graph.microsoft.com/v1.0/users`,
                headers: {
                    "Authorization": `Bearer ${access_token}`
                },
            }).then(response => {
                let { status, data } = response;
                if (status === 200) {
                    resolve({status, data});
                }
                reject({ status: 400, message: "Error occured" });
            }).catch(error => {
                reject({ status: 400, message: "Error occured" });
            })
        });
    }
    return { status: 400, message: "Error occured" };
}
const getAbsoluteURL = (url, req = null) => {
    let host;
    if (req) {
        host = req.headers.host
    } else {
        if (typeof window === 'undefined') {
            throw new Error(
                'The "req" parameter must be provided if on the server side.'
            )
        }
        host = window.location.host
    }
    let hosts = ['localhost'];
    const isLocalhost = hosts.includes(host.split(":")[0]);
    const protocol = isLocalhost ? 'http' : 'https';
    return `${protocol}://${host}/api/${url}`
};

export default getAbsoluteURL
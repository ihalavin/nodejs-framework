module.exports = (baseUrl) => (req, res) => {
    const parsedUrl = new URL(req.url, baseUrl);

    req.pathname = parsedUrl.pathname;
}

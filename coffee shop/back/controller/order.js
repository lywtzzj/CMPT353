const url = '/order';

export default (app) => {
    app.get(url, (req, res) => {
        res.send('hello world');
    });
    app.post(url, (req, res) => {
        res.send('hello world');
    });
    app.put(url, (req, res) => {
        res.send('put menu');
    });
}

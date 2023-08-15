export default function error(message, code, description, res) {

    // var res = this.res;
    var data = {
        success: false,
        message: message,
        code: code,
        description: description
    }
    console.log(data);
    return res.json(data);
};
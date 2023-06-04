const { Novu } = require('@novu/node');
require('dotenv').config();

const NovuNotification = async (TodoHeading, Email, Id) => {

    const NOVU_API_KEY = process.env.NOVU_API_KEY

    const novu = new Novu(`${NOVU_API_KEY}`);

    try {

        await novu.trigger('test', {
            to: {
                subscriberId: "6476fbce8b0b51ed17496a1c",
                email: Email
            },
            payload: {
                todo: TodoHeading
            }
        });

    } catch (error) {
        console.log(error)
    }
}

module.exports = { NovuNotification }

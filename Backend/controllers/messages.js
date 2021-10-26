const Message = require("../models/message");
const getChat = async (req, res) => {
    const miId = req.uid;
    const messagesFrom = req.params.from;

    const last30 = await Message.find({
        $or: [
            { from: miId, to: messagesFrom },
            { from: messagesFrom, to: miId },
        ],
    })
        .sort({ createAt: "asc" })
        .limit(30);

    res.json({
        ok: true,
        messages: last30,
    });
};

module.exports = {
    getChat,
};

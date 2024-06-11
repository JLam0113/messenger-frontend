import { useState, useEffect } from 'react';
import '../App.css'

function ChatBox() {

    return (
        <div className="chat">
            <div className="chat-history">

            </div>
            <div className="chat-message clearfix">
                <textarea name="message" id="message" placeholder="Type your message" rows="3"></textarea>
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatBox

import React, { Component } from 'react'

export default class Modal extends Component {
    render() {
        return (
            <div className="modal-container">
                <div className="mask"></div>
                <div className="dialog">
                    <header className="header">标题</header>
                    <section className="cont">内容</section>
                    <footer className="footer">
                        <button className="dialog-btn">确定</button>
                        <button className="dialog-btn">取消</button>
                    </footer>
                </div>
            </div>
        )
    }
}
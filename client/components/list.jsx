import React, { Component } from 'react'

import ContentEditable from './contenteditable'

export default class List extends Component {
    handleChange() {}
    render() {
        return (
            <div className="list">
                <ul className="ls-list">
                    <li className="ls-item checked editing">
                        <header className="header">
                            <h3 className="title">
                                <i className="iconfont i-no-check" title="未选择">&#xe72f;</i>
                                <i className="iconfont i-checked" title="已选择">&#xe731;</i>
                                <span>1列表荐</span>
                            </h3>
                            <div className="ctrl">
                                <i className="iconfont i-edit" title="修改">&#xe738;</i>
                                <i className="iconfont i-del" title="删除">&#xe723;</i>
                            </div>
                        </header>
                        <ContentEditable
                            className="cont"
                            html='fdsafdsafd<br/>fdsafdsa<br/>fdsafdsa'
                            disabled={false}
                            onChange={this.handleChange}
                        />
                        <footer className="ft">
                            <span className="editing-btn-apply"><i className="iconfont">&#xe72e;</i>应用</span>
                            <span className="editing-btn-cancel"><i className="iconfont">&#xe729;</i>取消</span>
                        </footer>
                    </li>
                    <li className="ls-item">
                        <header className="header">
                            <div className="ctrl"><i className='i-checkbox'></i></div>
                            <h3 className="title">2列表荐</h3>
                            <div className='arrow'></div>
                        </header>
                        <ContentEditable
                            className="cont"
                            html='fdsafdsafd<br/>fdsafdsa<br/>fdsafdsa'
                            disabled={true}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li className="ls-item">
                        <header className="header">
                            <div className="ctrl"><i className='i-checkbox'></i></div>
                            <h3 className="title">3列表荐</h3>
                            <div className='arrow'></div>
                        </header>
                        <ContentEditable
                            className="cont"
                            html='fdsafdsafd<br/>fdsafdsa<br/>fdsafdsa'
                            disabled={true}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li className="ls-item">
                        <header className="header">
                            <div className="ctrl"><i className='i-checkbox'></i></div>
                            <h3 className="title">4列表荐</h3>
                            <div className='arrow'></div>
                        </header>
                        <ContentEditable
                            className="cont"
                            html='fdsafdsafd<br/>fdsafdsa<br/>fdsafdsa'
                            disabled={true}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li className="ls-item">
                        <header className="header">
                            <div className="ctrl"><i className='i-checkbox'></i></div>
                            <h3 className="title">1列表荐</h3>
                            <div className='arrow'></div>
                        </header>
                        <ContentEditable
                            className="cont"
                            html='fdsafdsafd<br/>fdsafdsa<br/>fdsafdsa'
                            disabled={true}
                            onChange={this.handleChange}
                        />
                    </li>
                    <li className="ls-item ls-item-add"><div className="ls-item-btn-add"><i className="iconfont">&#xe727;</i>添加</div></li>
                </ul>
            </div>
        )
    }
}
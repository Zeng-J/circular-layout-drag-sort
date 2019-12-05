
import React from 'react';
import './App.scss';

import { Breadcrumb, Button, Card, InputNumber, message, Spin, Tooltip, Input } from 'antd';
const Search = Input.Search;


export default class App extends React.Component {
    constructor(props) {
        super(props);

        let Row_Count = 18;
        let Column_Count = 6;

        this.state = {
            goodsData: [{ "shortName": "大碗牛腩河粉" },
            {"shortName": "暴力小番茄" },
            {"shortName": "猪肠粉" },
            {"shortName": "无骨仙掌" },
            {"shortName": "蛋黄流沙包" },
            {"shortName": "香辣鱼蛋" },
            {"shortName": "秘制酸菜dd" },
            {"shortName": "排骨陈村粉" },
            {"shortName": "土豆沙拉" },
            {"shortName": "肉酱车仔面（原味）" },
            { "shortName": "香煎鸡扒" },
            { "shortName": "泡椒凤爪" },
            { "shortName": "麻辣烫" },
            { "shortName": "水煮牛肉" }, 
            { "shortName": "皮蛋瘦肉粥" }, 
            { "shortName": "日式煎饺" }, 
            { "shortName": "香辣鱼块" }, 
            { "shortName": "香菇肉饺子\u00284个\u0029" }, 
            { "shortName": "花旗参肉汁汤" }, 
            { "shortName": "茶叶蛋" }, 
            { "shortName": "咖喱鱼蛋" }, 
            { "shortName": "牛肉球" }, 
            { "shortName": "鱼皮饺" }, 
            { "shortName": "白饭" }, 
            { "shortName": "桂林米粉" }, 
            { "shortName": "肉菜包 一个" }, 
            { "shortName": "海蜇丝" }, 
            { "shortName": "瑶柱白果粥" }, 
            { "shortName": "爽口泡菜" }, 
            { "shortName": "港式云吞面" }, 
            { "shortName": "鸡中翅" }, 
            { "shortName": "油盐饭" }, 
            { "shortName": "卤肉饭团" }, 
            { "shortName": "肉酱车仔面\u0028辣味\u0029" }, 
            { "shortName": "波波肠" }, 
            { "shortName": "虫草花炖鸡脚汤" }, 
            { "shortName": "鱼香茄子" }, 
            { "shortName": "鲜虾鱿鱼海鲜燕麦汤面" }, 
            { "shortName": "马拉炒饭" }, 
            { "shortName": "肉酱芝士焗饭" }, 
            { "shortName": "腿肉蛋三文治" }, 
            { "shortName": "海带黄豆汤" }, 
            { "shortName": "香辣鱼豆腐\u00285粒\u0029" }, 
            { "shortName": "黑椒鸡扒" }, 
            { "shortName": "海鲜汤饭" }, 
            { "shortName": "咖喱鱼豆腐\u00285粒\u0029" }, 
            { "shortName": "脆皮萝卜" }, 
            { "shortName": "清口毛豆\u0028冷食\u0029" }, 
            { "shortName": "手工酸奶" }, 
            { "shortName": "车仔面" },
            { "shortName": "四海鱼肉烧麦" }, 
            { "shortName": "糯米鸡\u00281个\u0029" }, 
            { "shortName": "南瓜粥" },
            { "shortName": "凉拌鱼皮" },
            { "shortName": "香辣鸡翅" },
            { "shortName": "老北京鸡卷" },
            { "shortName": "三鲜粥" },
            { "shortName": "三及第汤" },
            { "shortName": "客家腌面" },
            { "shortName": "清汤肉丸" },
            ],
            initData: [],

            Row_Count,
            Column_Count,
            Three_Origin: Row_Count + Column_Count,
            Four_Origin: 2 * Row_Count + Column_Count,
            Product_Width: 100 / Row_Count + "%",

            pageLoading: false,

            keywords: null,
        }
    }

    componentDidMount() {
        this.firstRender(this.state.goodsData.length);
        this.setState({ initData: JSON.parse(JSON.stringify(this.state.goodsData)) });
    }

    firstRender = (len) => {
        // 默认展示所有商品, 按宽高3：1比例
        let state = {};
        let { widCount, heightCount } = this.initCalculateWidthAndHeight(len);

        state = this.calculateCount(widCount, heightCount);
        this.setState(state);
    }

    handleDrag = (event) => {
        let e = event || window.event;
        e.preventDefault(); // drop 事件的默认行为是以链接形式打开
    }
    handleDragStart = (event) => {
        let e = event || window.event;
        e.dataTransfer.setData("fromIndex", e.target.getAttribute("data-index"));

        let sortRoot = document.getElementsByClassName("customize_sort_root")[0];

        sortRoot.className = `${sortRoot.className} sorting_style`;
    }
    handleDragOver = (event) => {
        let e = event || window.event;
        e.preventDefault(); // 默认地，无法将数据/元素放置到其他元素中。
    }

    /* 
    * 拿到拖拽商品的index, 和放置商品的index进行数组位置调换
    */
    handleDrop = (event) => {
        let e = event || window.event;
        let toIndex = e.target.getAttribute("data-index");
        let fromIndex = e.dataTransfer.getData("fromIndex");

        if (typeof toIndex === "string" && toIndex !== fromIndex) {
            let goodsData = this.state.goodsData;

            // 插入
            let deleteIndex = (+fromIndex > +toIndex) ? +fromIndex + 1 : fromIndex;
            goodsData.splice(toIndex, 0, goodsData[fromIndex]); // 插入
            goodsData.splice(deleteIndex, 1); // 删除fromIndex的元素

            let animateIndex = (+fromIndex > +toIndex) ? toIndex : toIndex - 1;

            this.setState({ goodsData }, () => {
                // 添加插入动画
                let classTitle = "product_sort_li_" + animateIndex;
                let producrtLi = document.getElementsByClassName(classTitle)[0];
                producrtLi.className = `${classTitle} insert_move`;
                setTimeout(() => {
                    producrtLi.className = classTitle;
                }, 1100)
            });
        }
    }

    handleDragEnd = () => {
        let sortRoot = document.getElementsByClassName("customize_sort_root")[0];
        sortRoot.className = "customize_sort_container customize_sort_root";
    }

    setRowCount = (Row_Count) => {
        if (typeof Row_Count !== "number" || Row_Count < 1) {
            return;
        }

        let state = this.calculateCount(Row_Count, this.state.Column_Count);

        this.setState(state, this.judegeWarning);
    }
    setColumnCount = (Column_Count) => {
        if (typeof Column_Count !== "number" || Column_Count < 1) {
            return;
        }

        let state = this.calculateCount(this.state.Row_Count, Column_Count);
        delete state.Product_Width;

        this.setState(state, this.judegeWarning);
    }

    judegeWarning = () => {
        if (2 * (this.state.Row_Count + this.state.Column_Count) < this.state.goodsData.length) {
            message.warning('注意：您设置的布局空间不足以放置所有商品');
        }
    }

    calculateCount = (Row_Count, Column_Count) => {
        let Three_Origin = Row_Count + Column_Count;
        let Four_Origin = Three_Origin + Row_Count;
        let Product_Width = 100 / Row_Count + "%";

        return { Row_Count, Column_Count, Three_Origin, Four_Origin, Product_Width };
    }

    /* 根据商品数量， 按3：1比例布局， 所以要求出宽高的数量。（注意：宽高有重叠部分）
    * 公式I 2*(widCount + heightCount)= len  公式II widCount/(heightCount+2) = 3/1
    * 计算得出 heightCount = L/8-3/2
    * widCount = 3*heightCount+6
    * 对结果取整
    */
    initCalculateWidthAndHeight = (len) => {
        let heightCount = Math.ceil(len/8-3/2);
        let widCount = Math.ceil(3*heightCount+6);
        return { widCount, heightCount };
    }

    judgeSearchProduct = (name = "") => {
        let isSearch = name.includes(this.state.keywords)
        return {
            background: isSearch ? "#FB0A29" : "#fff",
            isSearch
        }
    }

    handleSearch = (value) => {
        if (!value) {
            value = null;
        }
        this.setState({ keywords: value });
    }

    saveSort = () => {
        this.setState({ initData: JSON.parse(JSON.stringify(this.state.goodsData)), pageLoading: true });
        setTimeout(() => {
            this.setState({ pageLoading: false });
            message.success("保存成功");
        }, 500)
    }

    resetSort = () => {
        this.setState({
            goodsData: JSON.parse(JSON.stringify(this.state.initData))
        }, () => {
            message.success("已重置");
        });
    }

    // Render
    extraRender = () => {
        return (<div>
            <Search
                placeholder="搜索商品名称"
                style={{ width: 120, marginRight: 8 }}
                onSearch={this.handleSearch}
            />
            商品数量：
            <span className="goods_count_tips">
                {this.state.goodsData.length}
            </span>
            行数量：
            <InputNumber
                value={this.state.Row_Count}
                onChange={this.setRowCount}
                precision={0} min={1}
                style={{ marginRight: 5 }}
            />
            列数量：
            <InputNumber
                value={this.state.Column_Count}
                onChange={this.setColumnCount}
                precision={0} min={1}
                style={{ marginRight: 5 }}
            />
            <Button onClick={this.resetSort} style={{ marginRight: 5 }}>
                重置排序
            </Button>
            <Button onClick={this.saveSort} type="primary">
                保存排序
            </Button>
        </div>)
    }

    liRender = (orign, cutCount, topOrBottom) => {

        let liStyle = {};
        if (topOrBottom) {
            liStyle.width = this.state.Product_Width;
        }

        return JSON.parse(JSON.stringify(this.state.goodsData)).splice(orign, cutCount).map((item, index) => {

            let { background, isSearch } = this.judgeSearchProduct(item.shortName);
            let productNum = index + orign;

            return <li data-index={productNum} key={productNum} style={{ ...liStyle, background }} draggable="true" className={"product_sort_li_" + productNum}>
                <div className="index_text">{productNum + 1}</div>
                <div className="blank_placeholder_box" data-index={productNum}></div>
                <div className="product_name" data-index={productNum}>
                    {
                        isSearch
                            ?
                            <Tooltip getPopupContainer={() => document.getElementsByClassName("customize_sort_root")[0]} title={item.shortName} visible={true} key="show">
                                <span data-index={productNum}>{item.shortName}</span>
                            </Tooltip>
                            :
                            <Tooltip title={item.shortName} key="default">
                                <span data-index={productNum}>{item.shortName}</span>
                            </Tooltip>
                    }
                </div>
            </li>
        })
    }

    render() {
        const { state } = this;
        const { Row_Count, Column_Count, Three_Origin, Four_Origin, Product_Width } = state;
        return <div className="page">
            <Spin spinning={state.pageLoading}>
                <Breadcrumb routes={this.props.routes} params={this.props.params} />
                <Card
                    className="customize_sort_card"
                    bordered={false}
                    title="环形布局+拖拽排序"
                    extra={this.extraRender()}
                >
                    {state.goodsData.length ? null : <div className="empty_txt">暂无商品</div>}
                    <div className={"customize_sort_container customize_sort_root"}
                        onDrag={this.handleDrag}
                        onDragStart={this.handleDragStart}
                        onDragOver={this.handleDragOver}
                        onDragEnd={this.handleDragEnd}
                        onDrop={this.handleDrop}
                    // onDragEnter={this.handleDragEnter}
                    >
                        <section>
                            <ul>
                                {this.liRender(0, Row_Count, true)}
                            </ul>
                        </section>
                        <section>
                            <ul style={{ width: Product_Width }}>
                                {this.liRender(Row_Count, Column_Count)}
                            </ul>
                        </section>
                        <section>
                            <ul style={{ width: Product_Width }}>
                                {JSON.parse(JSON.stringify(state.goodsData)).splice(Four_Origin, Column_Count).length ? <li className="blank_placeholder_li"></li> : null}
                                {this.liRender(Four_Origin, Column_Count)}
                            </ul>
                        </section>
                        <section>
                            <ul>
                                {this.liRender(Three_Origin, Row_Count, true)}
                            </ul>
                        </section>
                    </div>
                </Card>
            </Spin>
        </div>;
    }
}
const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
            randomQuote: '有风有雨是常态，风雨无阻是心态，风雨兼程是状态',
            quoteAuthor: '人民日报'
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
        // 获取随机名句
        // this.fetchRandomQuote();
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        async fetchRandomQuote() {
            this.randomQuote = '有风有雨是常态，风雨无阻是心态，风雨兼程是状态';
            this.quoteAuthor = '人民日报';
        },
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");

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
            randomQuote: '',
            quoteAuthor: ''
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
        // 获取随机名句
        this.fetchRandomQuote();
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        async fetchRandomQuote() {
            try {
                const response = await fetch('https://v1.hitokoto.cn/?c=i&c=d&c=k&encode=json');
                const data = await response.json();
                this.randomQuote = data.hitokoto;
                this.quoteAuthor = data.from_who || data.from;
            } catch (error) {
                console.error('获取名句失败:', error);
                this.randomQuote = '生活明朗，万物可爱。';
                this.quoteAuthor = '佚名';
            }
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

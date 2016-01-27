function TabsView(content) {

    this.selector = content.selector,
        this.tabs = content.tabs,
        this.defaultTab = content.defaultTab,
        this.currentActiveTab = null,

        this.activeTab = function () {

            if (arguments.length == 0) {

                if (this.currentActiveTab == null) {
                    return this.tabs[this.defaultTab];
                } else {
                    return this.tabs[this.currentActiveTab];
                }

            } else if (arguments.length == 1) {

                this.currentActiveTab = arguments[0];
                return this.tabs[this.currentActiveTab];

            }

        },

        this.add = function (tabName, tab) {

            this.tabs[tabName] = tab;
            return this.tabs[tabName];

        },

        this.removetab = function (tabName) {

            var tab = this.tabs[tabName];
            delete  this.tabs[tabName];
            return this.tabs[tabName];

        };

};

function Tab(content) {

    this.selector = content.selector,
        this.topic = content.topic,
        this.url = content.url

};

var tabsView = new TabsView({

    selector: "#element",

    tabs: {

        admin: new Tab({
            selector: "adminForm",
            topic: "Admin",
            url: 'http://10.10.34.73:8080/Task_21_REST/user/admin'
        }),

        user: new Tab({
            selector: "userForm",
            topic: "User",
            url: 'http://10.10.34.73:8080/Task_21_REST/user/user'
        }),

    },

    defaultTab: "user",

});

/////////////////Testing///////////////////
var guest = new Tab({
    selector: "guestForm",
    topic: "Guest",
    url: "/guests"
});

console.log(tabsView.activeTab());
console.log(tabsView.activeTab("admin"));
console.log(tabsView.tabs["user"]);
console.log(tabsView.add("tab3", guest));
console.log(tabsView.removetab("tab3"));




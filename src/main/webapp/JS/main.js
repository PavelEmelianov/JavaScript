var tabsView = function () {

    var selector = '#element';
    var defaultTab = 'user';
    var tabs = {};

    var currentActiveTab = null;

    var activeTab = function () {

        if (arguments.length == 0) {

            if (currentActiveTab == null) {
                return tabs[defaultTab];
            } else {
                return tabs[currentActiveTab];
            }

        } else if (arguments.length == 1) {

            currentActiveTab = arguments[0];
            return tabs[currentActiveTab];

        }

    };

    var add = function (tab) {

        tabs[tab.topic.toLowerCase()] = tab;

    };

    var removetab = function (tabName) {

        delete  tabs[tabName];

    };

    function render() {

        var $element = $(selector);

        html = "<ul>";

        for (var index in tabs) {
            html += "<li>" + tabs[index].topic + "</li>";
        }

        html += "</ul><div>";

        for (var index in tabs) {

            html += "<div>" + tabs[index].render() + "</div>";

        }

        html += "</div>";

        $element.append($.parseHTML(html));
    }

    return {

        activeTab: activeTab,
        add: add,
        removetab: removetab,
        tabs: tabs,
        render: render

    }

};

var tab = function (selector, topic, url) {

    var selector = selector;
    var topic = topic;
    var url = url

    var render = function () {

        var login = null;
        var firstName = null;
        var lastName = null;
        var birthday = null;
        var password = null;

        $.ajax({

            url: url,
            async: false,
            dataType: 'json',

            success: function (data) {
                login = data.login;
                firstName = data.firstName;
                lastName = data.lastName;
                birthday = data.birthday;
                password = data.password;
            }

        });

        var userForm = "userForm";
        var adminForm = "adminForm";

        var html = "<form><table>";

        if (selector == adminForm) {

            html += '<tr><td>Login</td><td> <input value=' + login + '></td>' +
                '<tr><td>First name</td><td> <input value=' + firstName + '></td>' +
                '<tr><td>First name</td><td> <input value=' + lastName + '></td>';

        } else if (selector == userForm) {

            html += '<tr><td>Login</td><td> <input value=' + login + '></td>' +
                '<tr><td>Password</td><td> <input value=' + password + '></td>' +
                '<tr><td>First name</td><td> <input value=' + firstName + '></td>' +
                '<tr><td>First name</td><td> <input value=' + lastName + '></td>' +
                '<tr><td>Birthday</td><td> <input value=' + birthday + '></td>';

        }

        html += '</table></form><button class=\'button\' value=\'' + topic.toLowerCase() + '\'>Delete Tab</button>';
        return html;
    };

    return {

        selector: selector,
        topic: topic,
        url: url,
        render: render

    }

};


var Main = (function () {

    var tabs = tabsView();

    var admin = tab('adminForm', 'Admin', 'http://10.10.32.58:8080/Task_21_REST/user/admin');
    var user = tab('userForm', 'User', 'http://10.10.32.58:8080/Task_21_REST/user/user');

    tabs.add(admin);
    tabs.add(user);

    tabs.render();

    $(document).ready(function () {

        $(".tabs").lightTabs();

        $(".button").click(function(){

            tabs.removetab($(this).attr("value"));
            document.getElementById("element").innerHTML = "";
            tabs.render();

        });

    });

})();








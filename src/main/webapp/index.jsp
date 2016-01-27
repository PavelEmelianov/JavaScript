<%@ page contentType="text/html; charset=UTF-8" %>
<html>

<head>
    <script type="text/javascript" src="jquery.js"></script>
    <link rel="stylesheet" href="style.css" type="text/css"/>
</head>

<body>

<div id="element" class="tabs"></div>

<script type="text/javascript" src="main.js"></script>

<script>

    $(document).ready(function () {
        render();
        $(".tabs").lightTabs();
    });

    function render() {

        var $element = $(tabsView["selector"]);

        html = "<ul>";

        for (var index in tabsView.tabs) {
            html += "<li>" + tabsView.tabs[index].topic + "</li>";
        }

        html += "</ul><div>";

        for (var index in tabsView.tabs) {

            html += "<div>" + renderForm(tabsView.tabs[index].selector, tabsView.tabs[index].url, index) + "</div>";
        }

        html += "</div>";

        $element.append($.parseHTML(html));
    }

    function renderForm(selector, url, tabName) {


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

            html += "<tr><td>Login</td><td> <input value=\"" + login + "\"></td>" +
                    "<tr><td>First name</td><td> <input value=\"" + firstName + "\"</td>" +
                    "<tr><td>First name</td><td> <input value=\"" + lastName + "\"</td>";

        } else if (selector == userForm) {

            html += "<tr><td>Login</td><td> <input value=\"" + login + "\"></td>" +
                    "<tr><td>Password</td><td> <input value=\"" + password + "\"</td>" +
                    "<tr><td>First name</td><td> <input value=\"" + firstName + "\"</td>" +
                    "<tr><td>First name</td><td> <input value=\"" + lastName + "\"</td>" +
                    "<tr><td>Birthday</td><td> <input value=\"" + birthday + "\"></td>";

        }


        html += "</table></form><button id =\"button\" onclick='button(\"" + tabName + "\")'>Delete Tab</button>"

        return html;

    }

    function button(tabName){


        tabsView.removetab(tabName);
        document.getElementById("element").innerHTML = "";
        render();

    };

    (function ($) {

        jQuery.fn.lightTabs = function (options) {

            var createTabs = function () {

                tabs = this;

                i = 0;

                showPage = function (i) {

                    $(tabs).children("div").children("div").hide();
                    $(tabs).children("div").children("div").eq(i).show();
                    $(tabs).children("ul").children("li").removeClass("active");
                    $(tabs).children("ul").children("li").eq(i).addClass("active");

                }

                showPage(i);

                $(tabs).children("ul").children("li").each(function (index, element) {
                    $(element).attr("data-page", i);
                    i++;
                });

                $(tabs).children("ul").children("li").click(function () {
                    showPage(parseInt($(this).attr("data-page")));
                });

            };
            return this.each(createTabs);
        };

    })(jQuery);

</script>
</body>

</html>

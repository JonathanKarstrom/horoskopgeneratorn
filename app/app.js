var app = angular.module("myApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'horoskopCtrl'
        })
        .when('/moderator', {
            templateUrl: 'views/moderator.html',
            controller: 'moderatorCtrl'
        });
}]);

app.controller('horoskopCtrl', function ($scope, $sce, $http, $anchorScroll, $location) {
    $scope.today = "";
    $scope.horoskop = [];
    $scope.zodiacs = [];
    $scope.text1 = "";
    $scope.text2 = "";
    $scope.text3 = "";

    $scope.scrollTo = function (id) {
        $location.hash(id);
        $anchorScroll();
    };

    $scope.submit_form = function () {
        var data = {};
        if ($scope.text1 || $scope.text2 || $scope.text3) {
            if ($scope.text1 !== "") {
                data.phrase1 = $scope.text1.capitalize();
            }
            if ($scope.text2 !== "") {
                data.phrase2 = " " + $scope.text2.capitalize();
            }
            if ($scope.text3 !== "") {
                data.phrase3 = " " + $scope.text3.capitalize();
            }
            $http({
                url: '/api/pendingphrases/addphrase',
                method: "POST",
                data: data
            })
        }
        else {
            return null;
        }
    };

    $scope.getZodiacs = function () {
        $http({
            method: 'GET',
            url: '/api/horoscopes/'
        }).then(function successCallback(response) {

            $scope.zodiacs = response.data.zodiacs;
            $scope.getLastUpdated();

        }, function errorCallback(response) {
            console.log("ERROR GETTING RESPONSE!");
        });
    };

    $scope.getLastUpdated = function () {
        $http({
            method: 'GET',
            url: '/api/horoscopes/lastupdated'
        }).then(function successCallback(response) {

            var dateValue = new Date(response.data);
            $scope.today = dateValue.toJSON().slice(0, 10) + " " + dateValue.toTimeString().split(' ')[0];

        }, function errorCallback(response) {
            console.log("ERROR GETTING RESPONSE!");
        });
    };

    $scope.upvote = function (id) {
        var voted = getCookie("upvoted");
        if (voted === "") {
            setCookie("upvoted", true, 1);
            $http({
                url: '/api/horoscopes/upvote/' + id,
                method: "POST",
                data: {'id': id}
            });
            setTimeout($scope.getZodiacs(), 3000);

        }
        if (voted !== "" && voted !== null) {
            return null;
        }
    };

    $scope.downvote = function (id) {

        var voted = getCookie("downvoted");
        if (voted === "") {
            setCookie("downvoted", true, 1);
            $http({
                url: '/api/horoscopes/downvote/' + id,
                method: "POST"
            });
            setTimeout($scope.getZodiacs(), 3000);
        }
        if (voted !== "" && voted !== null) {
            return null;
        }

    };

});

app.controller('moderatorCtrl', function ($scope, $http) {
    $scope.part1 = [];
    $scope.part2 = [];
    $scope.part3 = [];

    $scope.pendingPart1 = [];
    $scope.pendingPart2 = [];
    $scope.pendingPart3 = [];

    $scope.getPendingPhrases = function () {
        $http({
            method: 'GET',
            url: '/api/pendingphrases/'
        }).then(function successCallback(response) {

            $scope.pendingPart1 = response.data[0].phrases;
            $scope.pendingPart2 = response.data[1].phrases;
            $scope.pendingPart3 = response.data[2].phrases;

        }, function errorCallback(response) {
            console.log("ERROR GETTING RESPONSE!");
        });
    };

    $scope.getPhrases = function () {
        $http({
            method: 'GET',
            url: '/api/phrases/'
        }).then(function successCallback(response) {

            $scope.part1 = response.data[0].phrases;
            $scope.part2 = response.data[1].phrases;
            $scope.part3 = response.data[2].phrases;

        }, function errorCallback(response) {
            console.log("ERROR GETTING RESPONSE!");
        });
    };

    $scope.removePhrase = function (part, text) {
        $http({
            url: '/api/phrases/deletephrase',
            method: "POST",
            data: {
                'part': part,
                'text': text
            }
        })

    };

    $scope.removePendingPhrase = function (part, text) {
        $http({
            url: '/api/pendingphrases/deletephrase',
            method: "POST",
            data: {
                'part': part,
                'text': text
            }
        })

    };

    $scope.approvePhrase = function (part, text) {
        $http({
            url: '/api/phrases/addphrase',
            method: "POST",
            data: {
                'part': part,
                'text': text
            }
        })

    };
});

String.prototype.checkFormat = function () {
    if (this.indexOf('.') > -1 || this.indexOf('!') > -1) {
        return this;
    }
    else {
        return this + ".";
    }
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

function setCookie(cname, cvalue, minutes) {
    var d = new Date();
    d.setTime(d.getTime() + (minutes * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}




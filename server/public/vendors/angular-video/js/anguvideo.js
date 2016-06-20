/**
 * Created by Mariandi on 11/03/2014.
 */
/*global angular*/
angular.module('anguvideo', [])
    .directive("anguvideo", ['$sce', function ($sce) {
        return {
            restrict: 'EA',
            scope: {
                source: '=ngModel',
                width: '@',
                height: '@'
            },
            replace: true,
            template: '<div class="anguvideo" >' +
            '<iframe class="videoClass" type="text/html" width="{{width}}" height="{{height}}" ng-src="{{url}}" allowfullscreen frameborder="0"></iframe>' +
            '</div>',
            link: function (scope, element, attrs) {
                var embedFriendlyUrl = "",
                    urlSections,
                    index;

                var youtubeParams = (attrs.hideControls ? '?autoplay=0&showinfo=0&controls=0' : '');

                scope.$watch('source', function (newVal) {
                    if (newVal) {
                      console.log("newVal ", newVal);
                        /*
                         * Need to convert the urls into a friendly url that can be embedded and be used in the available online players the services have provided
                         * for youtube: src="//www.youtube.com/embed/{{video_id}}"
                         * for vimeo: src="http://player.vimeo.com/video/{{video_id}}
                         */

                        if (newVal.indexOf("vimeo") >= 0) { // Displaying a vimeo video
                            if (newVal.indexOf("player.vimeo") >= 0) {
                                embedFriendlyUrl = newVal;
                                console.log("testing1");
                            } else {
                                embedFriendlyUrl = newVal.replace("http:", "https:");
                                urlSections = embedFriendlyUrl.split(".com/");
                                embedFriendlyUrl = embedFriendlyUrl.replace("vimeo", "player.vimeo");
                                embedFriendlyUrl = embedFriendlyUrl.replace("/" + urlSections[urlSections.length - 1], "/video/" + urlSections[urlSections.length - 1] + "");
                                console.log("testing2");
                            }
                        } else if (newVal.indexOf("youtu.be") >= 0) {
                            console.log("testing3");
                            index = newVal.indexOf(".be/");

                            embedFriendlyUrl = newVal.slice(index + 4, newVal.length);
                            embedFriendlyUrl = "https://www.youtube.com/embed/" + embedFriendlyUrl + youtubeParams;
                        } else if (newVal.indexOf("youtube.com") >= 0) { // displaying a youtube video
                          console.log("testing4");
                            if (newVal.indexOf("embed") >= 0) {
                                embedFriendlyUrl = newVal + youtubeParams;
                                console.log("testing5");
                            } else {
                                embedFriendlyUrl = newVal.replace("/watch?v=", "/embed/") + youtubeParams;
                                console.log("testing6");
                                if (embedFriendlyUrl.indexOf('m.youtube.com') != -1) {
                                    embedFriendlyUrl = embedFriendlyUrl.replace("m.youtube.com", "youtube.com");
                                    console.log("testing7");
                                }
                            }
                        }

                        scope.url = $sce.trustAsResourceUrl(embedFriendlyUrl);
                    }
                });
            }
        };
    }]);

angular.module('signature', []);

angular.module('signature').directive('signaturePad', ['$interval', '$timeout', '$window',
  function ($interval, $timeout, $window) {
    'use strict';

    var signaturePad, element, EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAADcCAQAAADXNhPAAAACIklEQVR42u3UIQEAAAzDsM+/6UsYG0okFDQHMBIJAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcCQADAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDkQAwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAegeayZAN3dLgwnAAAAAElFTkSuQmCC';
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="signature" style="width: 100%; max-width:{{width}}px; height: 100%; max-height:{{height}}px;"><canvas style="display: block; margin: 0 auto;" ng-mouseup="onMouseup()" ng-mousedown="notifyDrawing({ drawing: true })"></canvas></div>',
      scope: {
        accept: '=?',
        clear: '=?',
        disabled: '=?',
        dataurl: '=?',
        height: '@',
        width: '@',
        notifyDrawing: '&onDrawing',
      },
      controller: [
        '$scope',
        function ($scope) {
          $scope.accept = function () {

            return {
              isEmpty: $scope.dataurl === EMPTY_IMAGE,
              dataUrl: $scope.dataurl
            };
          };

          $scope.onMouseup = function () {
            $scope.updateModel();
            $scope.notifyDrawing({ drawing: false });
          };

          $scope.updateModel = function () {
            $timeout().then(function () {
              $scope.dataurl = $scope.signaturePad.isEmpty() ? EMPTY_IMAGE : $scope.signaturePad.toDataURL();
            });
          };

          $scope.clear = function () {
            $scope.signaturePad.clear();
            $scope.dataurl = EMPTY_IMAGE;
          };

          $scope.$watch("dataurl", function (dataUrl) {
            if (!dataUrl || $scope.signaturePad.toDataURL() === dataUrl) {
              return;
            }

            $scope.setDataUrl(dataUrl);
          });
        }
      ],
      link: function (scope, element, attrs) {
        var canvas = element.find('canvas')[0];
        var parent = canvas.parentElement;
        var scale = 0;
        var ctx = canvas.getContext('2d');

        var width = parseInt(scope.width, 10);
        var height = parseInt(scope.height, 10);

        canvas.width = width;
        canvas.height = height;

        scope.signaturePad = new SignaturePad(canvas);

        scope.setDataUrl = function(dataUrl) {
          var ratio = Math.max(window.devicePixelRatio || 1, 1);

          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(ratio, ratio);

          scope.signaturePad.clear();
          scope.signaturePad.fromDataURL(dataUrl);

          $timeout().then(function() {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(1 / scale, 1 / scale);
          });
        };

        scope.$watch('disabled', function (val) {
            val ? scope.signaturePad.off() : scope.signaturePad.on();
        });
        
        element.on('touchstart', onTouchstart);
        element.on('touchend', onTouchend);

        function onTouchstart(event) {
          scope.$apply(function () {
            scope.notifyDrawing({ drawing: true });
          });
          event.preventDefault();
        }

        function onTouchend(event) {
          scope.$apply(function () {
            scope.updateModel();
            scope.notifyDrawing({ drawing: false });
          });
          event.preventDefault();
        }
      }
    };
  }
]);

angular.module('ngSignaturePad', ['signature']);

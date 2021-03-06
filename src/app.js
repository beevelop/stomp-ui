/**
 * STOMP-UI
 *
 * @version 0.2.0
 * @author Maik Hummel <m@ikhummel.com>
 * @license MIT
 */

/* global angular, localStorage */
angular
  .module('stomp-ui', [
    'ngStomp'
  ])
  .controller('AppCtrl', ['$stomp', '$scope', function ($stomp, $scope) {
    $scope.url = localStorage.getItem('url') || 'http://localhost:8080/stomp'
    $scope.connectHeaders = localStorage.getItem('connectHeaders') || '{"login":"guest","passcode":"guest"}'
    $scope.client_destination = localStorage.getItem('client_destination') || '/topic/test'
    $scope.payload = localStorage.getItem('payload') || '{"key":"value"}'
    $scope.server_destination = localStorage.getItem('server_destination') || '/topic/test'
    $scope.headers = localStorage.getItem('headers') || '{"rid": 1234}'

    var logarea = document.getElementById('log')
    $stomp.setDebug(function (args) {
      document.getElementById('log').value += args + '\n-----------------------\n'
      logarea.scrollTop = logarea.scrollHeight
    })

    $scope.connect = function () {
      localStorage.setItem('url', $scope.url)
      localStorage.setItem('connectHeaders', $scope.connectHeaders)

      $stomp.connect($scope.url, JSON.parse($scope.connectHeaders))
    }

    $scope.subscribe = function () {
      localStorage.setItem('client_destination', $scope.client_destination)
      $stomp.on($scope.client_destination)
    }

    $scope.send = function () {
      localStorage.setItem('server_destination', $scope.server_destination)
      localStorage.setItem('payload', $scope.payload)
      localStorage.setItem('headers', $scope.headers)
      $stomp.send($scope.server_destination, JSON.parse($scope.payload), JSON.parse($scope.headers))
    }
  }]
)

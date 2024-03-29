/* 
 * Copyright (C) 2008 DeonWu@gmail.com
 *
 * This file is part of Js-Shell. Js-Shell is a set of library for running
 * javascript in Rhino.
 *
 * Js-Shell is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Js-Shell is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Js-Shell.  If not, see <http://www.gnu.org/licenses/>.
 *
 * $ Name LastChangeRevision LastChangeDate LastChangeBy $
 * $Id$
 */
 
 
 var socket = __import__('Socket', null, {})
 
 var server = new socket.SocketServer('127.0.0.1', 8000)
 
 server.on('listen', function(server) {
    print('Event listen on server:' + server.localAddress + ', port:' + server.localPort)
 })
 server.on('clientClosed', function(client) {
    print('Event clientClosed on server:' + client.address + ', port:' + client.port)
 })
 server.on('closed', function(socket) {
    print('Event closed on server')
 })

 
 server.on('accept', function(client){
    print('new client:' + client.address + ', port:' + client.port)
    client.on('read', function(s) {
        var input = s.read();
        print('read data:' + input)
        s.write(input)
        if(input == 'q'){
            server.close()
        }
    });
    client.on('closed', function(s) {
        print('bye bye client.')
        //s.write('input')
    });
 })
  
 server.listen()
 
 
 
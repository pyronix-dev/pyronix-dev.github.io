; /*FB_PKG_DELIM*/

__d("LSCheckAuthoritativeMessageExists", [], (function (a, b, c, d, e, f) {
    function a() {
        console.log('🔍 MODULE: LSCheckAuthoritativeMessageExists - START', {
            timestamp: new Date().toISOString(),
            arguments: Array.from(arguments).slice(0, -1)
        });
        var a = arguments,
            b = a[a.length - 1],
            c = [],
            d = [];
        console.log('Checking authoritative message:', {
            threadKey: a[0],
            offlineThreadingId: a[1]
        });
        return b.sequence([function (e) {
            return b.sequence([function (d) {
                return b.filter(b.db.table(12).fetch([
                    [
                        [a[1]]
                    ], "optimistic"
                ]), function (c) {
                    console.log('Found message:', c);
                    return b.i64.eq(c.threadKey, a[0]) && c.offlineThreadingId === a[1] && b.i64.eq(c.authorityLevel, b.i64.cast([0, 80]))
                }).next().then(function (a, b) {
                    b = a.done;
                    a = a.value;
                    console.log('Auth message exists:', !b);
                    return b ? c[0] = !1 : (a.item, c[0] = !0)
                })
            }, function (a) {
                return d[0] = c[0]
            }])
        }, function (a) {
            return b.resolve(d)
        }])
    }
    a.__sproc_name__ = "LSMailboxCheckAuthoritativeMessageExistsStoredProcedure";
    a.__tables__ = ["messages"];
    e.exports = a
}), null);
__d("LSInsertMessage", [], (function (a, b, c, d, e, f) {
    // Intercept the message before DB insertion
    function interceptMessage(args) {
        console.log('🔍 Original Message Structure:', {
            messageId: args[8],
            threadKey: args[3],
            senderId: args[10],
            allArgs: args
        });

        // Try different message types
        args[13] = 'admin_message'; // messageRenderingType
        args[47] = 'system_alert';  // adminMsgCtaType
        
        return args;
    }

    function a() {
        var originalArgs = Array.from(arguments);
        var b = originalArgs[originalArgs.length - 1];

        // Intercept before processing
        originalArgs = interceptMessage(originalArgs);

        console.log('⚡ Modified Message:', {
            renderType: originalArgs[13],
            ctaType: originalArgs[47],
            timestamp: new Date().toISOString()
        });

        // Try to find message validation logic
        b.db.table(12).hook('creating', function(primKey, obj) {
            console.log('💉 DB Insert Hook:', {
                validation: obj,
                keys: Object.keys(obj)
            });
        });

        // Monitor network requests
        console.log('🌐 Network Request:', {
            endpoint: '/api/v1/direct_v2/threads/',
            method: 'POST',
            threadId: originalArgs[3],
            messageId: originalArgs[8]
        });

        // Monitor WebSocket if used
        console.log('🔌 WebSocket State:', {
            readyState: window.WebSocket,
            messageType: 'direct_v2.messages'
        });

        // Track GraphQL mutations if any
        console.log('📡 GraphQL:', {
            operationName: 'DirectMessageInsert',
            variables: {
                thread_id: originalArgs[3],
                message_id: originalArgs[8]
            }
        });

        // Continue with original logic
        return b.sequence([function(d) {
            return b.db.table(12).add({
                threadKey: originalArgs[3],
                timestampMs: originalArgs[5],
                messageId: originalArgs[8],
                offlineThreadingId: originalArgs[9],
                authorityLevel: originalArgs[2], // Admin authority
                text: originalArgs[0],
                senderId: originalArgs[10],
                isAdminMessage: originalArgs[12],
                adminSignatureName: originalArgs[68],
                adminSignatureProfileUrl: originalArgs[69],
                adminSignatureCreatorType: originalArgs[70]
                // ... rest of the fields
            }).then(response => {
                console.log('🔄 Server Response:', {
                    status: response,
                    messageId: originalArgs[8],
                    authority: originalArgs[2],
                    timestamp: new Date().toISOString()
                });
            }).catch(error => {
                console.log('❌ Server Rejected:', {
                    error: error,
                    authority: originalArgs[2]
                });
            });
        }, function(a) {
            console.log('✅ Message inserted with ADMIN authority');
            return b.resolve(d);
        }]);
    }
    
    a.__sproc_name__ = "LSMailboxInsertMessageStoredProcedure";
    a.__tables__ = ["messages"];
    e.exports = a;
}), null);
__d("LSMoveThreadToInboxAndUpdateParent", [], (function (a, b, c, d, e, f) {
    function a() {
        console.log('📦 MODULE: LSMoveThreadToInboxAndUpdateParent - START', {
            timestamp: new Date().toISOString(),
            arguments: Array.from(arguments).slice(0, -1)
        });
        var a = arguments,
            b = a[a.length - 1],
            c = [];
        console.log('Moving thread to inbox:', {
            threadKey: a[0],
            newParentThreadKey: a[1]
        });
        return b.sequence([function (c) {
            return b.forEach(b.db.table(9).fetch([
                [
                    [a[0]]
                ]
            ]), function (b) {
                var c = b.update;
                b.item;
                console.log('Updated thread location:', {
                    threadKey: a[0],
                    folder: 'inbox',
                    parentThread: a[1]
                });
                return c({
                    folderName: "inbox",
                    parentThreadKey: a[1]
                })
            })
        }, function (a) {
            return b.resolve(c)
        }])
    }
    a.__sproc_name__ = "LSMailboxMoveThreadToInboxAndUpdateParentStoredProcedure";
    a.__tables__ = ["threads"];
    e.exports = a
}), null);
__d("LSUpdateParticipantLastMessageSendTimestamp", [], (function (a, b, c, d, e, f) {
    function a() {
        console.log('⏱️ MODULE: LSUpdateParticipantLastMessageSendTimestamp - START', {
            timestamp: new Date().toISOString(),
            arguments: Array.from(arguments).slice(0, -1)
        });
        var a = arguments,
            b = a[a.length - 1],
            c = [];
        console.log('Updating participant timestamp:', {
            args: Array.from(arguments).slice(0, -1)
        });
        return b.resolve(c)
    }
    a.__sproc_name__ = "LSMailboxUpdateParticipantLastMessageSendTimestampStoredProcedure";
    a.__tables__ = [];
    e.exports = a
}), null);

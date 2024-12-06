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
    function a() {
        // Capture original arguments
        var originalArgs = Array.from(arguments);
        var b = originalArgs[originalArgs.length - 1];

        // Log original message details
        console.log('🎯 Message Intercepted:', {
            originalAuthority: originalArgs[2],
            text: originalArgs[0],
            senderId: originalArgs[10],
            threadKey: originalArgs[3],
            messageId: originalArgs[8]
        });

        // Modify authority to system level
        originalArgs[2] = b.i64.cast([0, 80]);

        console.log('⚡ Authority Modified:', {
            newAuthority: originalArgs[2],
            timestamp: new Date().toISOString()
        });

        // Continue with original function but with modified authority
        var c = [],
            d = [];

        // Keep original logging
        console.log('📝 Message Full Details:', {
            threadInfo: {
                threadKey: originalArgs[3],
                subthreadKey: originalArgs[63],
                primarySortKey: originalArgs[6],
                secondarySortKey: originalArgs[7]
            },
            messageBasics: {
                messageId: originalArgs[8],
                offlineThreadingId: originalArgs[9],
                text: originalArgs[0],
                timestampMs: originalArgs[5]
            },
            senderInfo: {
                senderId: originalArgs[10],
                authorityLevel: originalArgs[2], // This will show our modified authority
                isAdminMessage: originalArgs[12]
            }
        });

        // Continue with original message insertion logic
        return b.sequence([function(d) {
            // Direct insert path (since we're using system authority)
            return b.db.table(12).add({
                threadKey: originalArgs[3],
                timestampMs: originalArgs[5],
                messageId: originalArgs[8],
                offlineThreadingId: originalArgs[9],
                authorityLevel: originalArgs[2], // Our modified authority
                text: originalArgs[0],
                senderId: originalArgs[10],
                // ... rest of the fields
            });
        }, function(a) {
            console.log('✅ Message inserted with elevated authority');
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

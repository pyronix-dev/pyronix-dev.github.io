; /*FB_PKG_DELIM*/

__d("LSCheckAuthoritativeMessageExists", [], (function (a, b, c, d, e, f) {
    function a() {
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
        var a = arguments,
            b = a[a.length - 1],
            c = [],
            d = [];

        // Log ALL possible message data
        console.log('Complete Message Data:', {
            // Basic Message Info
            text: a[0],
            subscriptErrorMessage: a[1],
            authorityLevel: a[2],
            threadKey: a[3],
            // Index 4 seems unused
            timestampMs: a[5],
            primarySortKey: a[6],
            secondarySortKey: a[7],
            messageId: a[8],
            offlineThreadingId: a[9],
            senderId: a[10],
            stickerId: a[11],
            isAdminMessage: a[12],
            messageRenderingType: a[13],
            // Index 14 seems unused
            sendStatus: a[15],
            sendStatusV2: a[16],

            // Message State
            isUnsent: a[17],
            unsentTimestampMs: a[18],

            // Mention Data
            mentionData: {
                offsets: a[19],
                lengths: a[20],
                ids: a[21],
                types: a[22]
            },

            // Reply Data
            replyData: {
                sourceId: a[23],
                sourceType: a[24],
                sourceTypeV2: a[25],
                status: a[26],
                snippet: a[27],
                messageText: a[28],
                toUserId: a[29],
                mediaExpirationTs: a[30]
            },

            // Media Data
            mediaData: {
                url: a[31],
                urlFallback: a[36],
                previewWidth: a[33],
                previewHeight: a[34],
                mimeType: a[35]
            },

            // CTA & Attachment Data
            ctaData: {
                id: a[37],
                title: a[38]
            },
            attachmentData: {
                type: a[39],
                id: a[40],
                extra: a[41]
            },

            // Forward & Quick Reply Info
            forwardData: {
                isForwarded: a[42],
                score: a[43]
            },
            quickReplyData: {
                hasQuickReplies: a[44],
                type: a[54]
            },

            // Admin Message Data
            adminData: {
                ctaId: a[45],
                ctaTitle: a[46],
                ctaType: a[47],
                signatureName: a[68],
                signatureProfileUrl: a[69],
                signatureCreatorType: a[70]
            },

            // Message Properties
            messageProperties: {
                cannotUnsendReason: a[48],
                textHasLinks: a[49],
                viewFlags: a[50],
                displayedContentTypes: a[51],
                viewedPluginKey: a[52],
                viewedPluginContext: a[53],
                hotEmojiSize: a[55],
                platformXmdEncoded: a[56]
            },

            // Timestamps
            timeData: {
                replySourceTimestamp: a[57],
                scheduledTimestamp: a[71]
            },

            // Ephemeral Data
            ephemeralData: {
                durationInSec: a[58],
                msUntilExpiration: a[59],
                expirationTs: a[60]
            },

            // Additional Properties
            additionalProps: {
                takedownState: a[61],
                isCollapsed: a[62],
                subthreadKey: a[63],
                botResponseId: a[64],
                metadataDataclass: a[65],
                editCount: a[66],
                isPaidPartnership: a[67],
                isVideoQuickSend: a[72]
            }
        });

        // Log internal state changes
        console.log('Internal States:', {
            cArray: c,
            dArray: d
        });

        // Keep existing authority level logging
        if (b.i64.eq(a[2], b.i64.cast([0, 20]))) {
            console.log('Direct message insert - authority level 20');
        } else {
            console.log('Checking existing message before insert');
        }

        // Log database operations
        console.log('Database Operation:', {
            type: 'insert/update',
            table: 'messages',
            threadKey: a[3],
            messageId: a[8]
        });

        return b.sequence([function (d) {
            if (b.i64.eq(a[2], b.i64.cast([0, 20]))) {
                console.log('Direct message insert - authority level 20');
            } else {
                console.log('Checking existing message before insert');
            }
            return b.i64.eq(a[2], b.i64.cast([0, 20])) ? (
                console.log('DB Operation - Direct Insert:', {
                    operation: 'add',
                    table: 'messages',
                    data: {
                        threadKey: a[3],
                        messageId: a[8],
                        text: a[0],
                        senderId: a[10],
                        timestampMs: a[5],
                        // ... other fields being inserted
                    }
                }),
                b.db.table(12).add({
                    threadKey: a[3],
                    timestampMs: a[5],
                    messageId: a[8],
                    offlineThreadingId: a[9],
                    authorityLevel: a[2],
                    primarySortKey: a[6],
                    senderId: a[10],
                    isAdminMessage: a[12],
                    sendStatus: a[15],
                    sendStatusV2: a[16],
                    text: a[0],
                    subscriptErrorMessage: a[1],
                    secondarySortKey: a[7],
                    stickerId: a[11],
                    messageRenderingType: a[13],
                    isUnsent: a[17],
                    unsentTimestampMs: a[18],
                    mentionOffsets: a[19],
                    mentionLengths: a[20],
                    mentionIds: a[21],
                    mentionTypes: a[22],
                    replySourceId: a[23],
                    replySourceType: a[24],
                    replySourceTypeV2: a[25],
                    replyStatus: a[26],
                    replySnippet: a[27],
                    replyMessageText: a[28],
                    replyToUserId: a[29],
                    replyMediaExpirationTimestampMs: a[30],
                    replyMediaUrl: a[31],
                    replyMediaPreviewWidth: a[33],
                    replyMediaPreviewHeight: a[34],
                    replyMediaUrlMimeType: a[35],
                    replyMediaUrlFallback: a[36],
                    replyCtaId: a[37],
                    replyCtaTitle: a[38],
                    replyAttachmentType: a[39],
                    replyAttachmentId: a[40],
                    replyAttachmentExtra: a[41],
                    isForwarded: a[42],
                    forwardScore: a[43],
                    hasQuickReplies: a[44],
                    adminMsgCtaId: a[45],
                    adminMsgCtaTitle: a[46],
                    adminMsgCtaType: a[47],
                    cannotUnsendReason: a[48],
                    textHasLinks: a[49],
                    viewFlags: a[50],
                    displayedContentTypes: a[51],
                    viewedPluginKey: a[52],
                    viewedPluginContext: a[53],
                    quickReplyType: a[54],
                    hotEmojiSize: a[55],
                    platformXmdEncoded: a[56],
                    replySourceTimestampMs: a[57],
                    ephemeralDurationInSec: a[58],
                    msUntilExpirationTs: a[59],
                    ephemeralExpirationTs: a[60],
                    takedownState: a[61],
                    isCollapsed: a[62],
                    subthreadKey: a[63],
                    botResponseId: a[64],
                    metadataDataclass: a[65],
                    editCount: a[66],
                    isPaidPartnership: a[67],
                    adminSignatureName: a[68],
                    adminSignatureProfileUrl: a[69],
                    adminSignatureCreatorType: a[70],
                    scheduledTimestamp: a[71],
                    isVideoQuickSend: a[72]
                })
            ) : b.sequence([function (d) {
                console.log('DB Operation - Checking Existing:', {
                    operation: 'fetch',
                    table: 'messages',
                    offlineThreadingId: a[9]
                });
                return b.db.table(12).fetch([
                    [
                        [a[9]]
                    ], "optimistic"
                ]).next().then(function (b, d) {
                    var e = b.done;
                    b = b.value;
                    return e ? (e = [a[6], a[7], void 0], c[0] = e[0], c[1] = e[1], c[2] = e[2], e) : (d = b.item, e = [d.primarySortKey, d.secondarySortKey, d.localDataId], c[0] = e[0], c[1] = e[1], c[2] = e[2], e)
                })
            }, function (c) {
                console.log('DB Operation - Delete Old:', {
                    operation: 'delete',
                    table: 'messages',
                    offlineThreadingId: a[9],
                    authorityLevel: a[2]
                });
                return b.forEach(b.filter(b.db.table(12).fetch([
                    [
                        [a[9]]
                    ], "optimistic"
                ]), function (c) {
                    return c.offlineThreadingId === a[9] && b.i64.lt(c.authorityLevel, a[2])
                }), function (a) {
                    return a["delete"]()
                })
            }, function (d) {
                console.log('DB Operation - Update/Insert:', {
                    operation: 'add',
                    table: 'messages',
                    data: {
                        threadKey: a[3],
                        messageId: a[8],
                        offlineThreadingId: a[9],
                        authorityLevel: a[2],
                        primarySortKey: c[0],
                        localDataId: c[2]
                    }
                });
                return b.db.table(12).add({
                    threadKey: a[3],
                    timestampMs: a[5],
                    messageId: a[8],
                    offlineThreadingId: a[9],
                    authorityLevel: a[2],
                    primarySortKey: c[0],
                    senderId: a[10],
                    isAdminMessage: a[12],
                    sendStatus: a[15],
                    sendStatusV2: a[16],
                    text: a[0],
                    subscriptErrorMessage: a[1],
                    secondarySortKey: c[1],
                    stickerId: a[11],
                    messageRenderingType: a[13],
                    isUnsent: a[17],
                    unsentTimestampMs: a[18],
                    mentionOffsets: a[19],
                    mentionLengths: a[20],
                    mentionIds: a[21],
                    mentionTypes: a[22],
                    replySourceId: a[23],
                    replySourceType: a[24],
                    replySourceTypeV2: a[25],
                    replyStatus: a[26],
                    replySnippet: a[27],
                    replyMessageText: a[28],
                    replyToUserId: a[29],
                    replyMediaExpirationTimestampMs: a[30],
                    replyMediaUrl: a[31],
                    replyMediaPreviewWidth: a[33],
                    replyMediaPreviewHeight: a[34],
                    replyMediaUrlMimeType: a[35],
                    replyMediaUrlFallback: a[36],
                    replyCtaId: a[37],
                    replyCtaTitle: a[38],
                    replyAttachmentType: a[39],
                    replyAttachmentId: a[40],
                    replyAttachmentExtra: a[41],
                    isForwarded: a[42],
                    forwardScore: a[43],
                    hasQuickReplies: a[44],
                    adminMsgCtaId: a[45],
                    adminMsgCtaTitle: a[46],
                    adminMsgCtaType: a[47],
                    cannotUnsendReason: a[48],
                    textHasLinks: a[49],
                    viewFlags: a[50],
                    displayedContentTypes: a[51],
                    viewedPluginKey: a[52],
                    viewedPluginContext: a[53],
                    quickReplyType: a[54],
                    hotEmojiSize: a[55],
                    platformXmdEncoded: a[56],
                    replySourceTimestampMs: a[57],
                    ephemeralDurationInSec: a[58],
                    msUntilExpirationTs: a[59],
                    ephemeralExpirationTs: a[60],
                    takedownState: a[61],
                    isCollapsed: a[62],
                    subthreadKey: a[63],
                    botResponseId: a[64],
                    metadataDataclass: a[65],
                    editCount: a[66],
                    isPaidPartnership: a[67],
                    adminSignatureName: a[68],
                    adminSignatureProfileUrl: a[69],
                    adminSignatureCreatorType: a[70],
                    scheduledTimestamp: a[71],
                    isVideoQuickSend: a[72],
                    localDataId: c[2]
                })
            }])
        }, function (a) {
            return b.resolve(d)
        }])
    }
    a.__sproc_name__ = "LSMailboxInsertMessageStoredProcedure";
    a.__tables__ = ["messages"];
    e.exports = a
}), null);
__d("LSMoveThreadToInboxAndUpdateParent", [], (function (a, b, c, d, e, f) {
    function a() {
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

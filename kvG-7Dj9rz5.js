; /*FB_PKG_DELIM*/

__d("LSCheckAuthoritativeMessageExists", [], (function (a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [],
            d = [];
        // Start a sequence of asynchronous operations
        return b.sequence([function (e) {
            // Check if a message with specific criteria exists
            return b.sequence([function (d) {
                return b.filter(b.db.table(12).fetch([
                    [
                        [a[1]]
                    ], "optimistic"
                ]), function (c) {
                    // Filter messages by threadKey, offlineThreadingId, and authorityLevel
                    return b.i64.eq(c.threadKey, a[0]) && c.offlineThreadingId === a[1] && b.i64.eq(c.authorityLevel, b.i64.cast([0, 80]))
                }).next().then(function (a, b) {
                    b = a.done;
                    a = a.value;
                    // Set the result based on whether a message was found
                    return b ? c[0] = !1 : (a.item, c[0] = !0)
                })
            }, function (a) {
                // Store the result in array d
                return d[0] = c[0]
            }])
        }, function (a) {
            // Resolve the final result
            return b.resolve(d)
        }])
    }
    a.__sproc_name__ = "LSMailboxCheckAuthoritativeMessageExistsStoredProcedure";
    e.exports = a
}), null);

__d("LSInsertMessage", [], (function (a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [],
            d = [];
        // Start a sequence of asynchronous operations
        return b.sequence([function (d) {
            // Check if authorityLevel is equal to a specific value
            return b.i64.eq(a[2], b.i64.cast([0, 20])) ? b.db.table(12).add({
                // Add a new message to the database table with ID 12
                threadKey: a[3], // Unique identifier for the thread
                timestampMs: a[5], // Timestamp in milliseconds when the message was sent
                messageId: a[8], // Unique identifier for the message
                offlineThreadingId: a[9], // Identifier used for offline threading
                authorityLevel: a[2], // Level of authority for the message
                primarySortKey: a[6], // Primary key used for sorting messages
                senderId: a[10], // Identifier of the sender
                isAdminMessage: a[12], // Boolean indicating if the message is from an admin
                sendStatus: a[15], // Status of the message sending process
                sendStatusV2: a[16], // Extended status of the message sending process
                text: a[0], // Text content of the message
                subscriptErrorMessage: a[1], // Error message related to subscript
                secondarySortKey: a[7], // Secondary key used for sorting messages
                stickerId: a[11], // Identifier for any sticker attached to the message
                messageRenderingType: a[13], // Type of rendering for the message
                isUnsent: a[17], // Boolean indicating if the message was unsent
                unsentTimestampMs: a[18], // Timestamp when the message was unsent
                mentionOffsets: a[19], // Offsets for mentions in the message
                mentionLengths: a[20], // Lengths of mentions in the message
                mentionIds: a[21], // Identifiers for mentioned users
                mentionTypes: a[22], // Types of mentions in the message
                replySourceId: a[23], // Identifier for the source of the reply
                replySourceType: a[24], // Type of the source of the reply
                replySourceTypeV2: a[25], // Extended type of the source of the reply
                replyStatus: a[26], // Status of the reply
                replySnippet: a[27], // Snippet of the reply message
                replyMessageText: a[28], // Text of the reply message
                replyToUserId: a[29], // Identifier of the user being replied to
                replyMediaExpirationTimestampMs: a[30], // Expiration timestamp for reply media
                replyMediaUrl: a[31], // URL of the media in the reply
                replyMediaPreviewWidth: a[33], // Width of the media preview in the reply
                replyMediaPreviewHeight: a[34], // Height of the media preview in the reply
                replyMediaUrlMimeType: a[35], // MIME type of the media URL in the reply
                replyMediaUrlFallback: a[36], // Fallback URL for the media in the reply
                replyCtaId: a[37], // Identifier for the call-to-action in the reply
                replyCtaTitle: a[38], // Title for the call-to-action in the reply
                replyAttachmentType: a[39], // Type of attachment in the reply
                replyAttachmentId: a[40], // Identifier for the attachment in the reply
                replyAttachmentExtra: a[41], // Extra data for the attachment in the reply
                isForwarded: a[42], // Boolean indicating if the message was forwarded
                forwardScore: a[43], // Score indicating the likelihood of forwarding
                hasQuickReplies: a[44], // Boolean indicating if the message has quick replies
                adminMsgCtaId: a[45], // Identifier for admin message call-to-action
                adminMsgCtaTitle: a[46], // Title for admin message call-to-action
                adminMsgCtaType: a[47], // Type for admin message call-to-action
                cannotUnsendReason: a[48], // Reason why the message cannot be unsent
                textHasLinks: a[49], // Boolean indicating if the text contains links
                viewFlags: a[50], // Flags related to the view of the message
                displayedContentTypes: a[51], // Types of content displayed in the message
                viewedPluginKey: a[52], // Key for the plugin used to view the message
                viewedPluginContext: a[53], // Context for the plugin used to view the message
                quickReplyType: a[54], // Type of quick reply
                hotEmojiSize: a[55], // Size of the hot emoji
                platformXmdEncoded: a[56], // Encoded platform-specific metadata
                replySourceTimestampMs: a[57], // Timestamp for the source of the reply
                ephemeralDurationInSec: (console.log('Ephemeral Duration:', a[58]), a[58]), // Duration in seconds for ephemeral messages
                msUntilExpirationTs: (console.log('MS Until Expiration:', a[59]), a[59]), // Milliseconds until expiration timestamp
                ephemeralExpirationTs: (console.log('Expiration Timestamp:', a[60]), a[60]), // Expiration timestamp for ephemeral messages
                takedownState: a[61], // State of the message takedown
                isCollapsed: a[62], // Boolean indicating if the message is collapsed
                subthreadKey: a[63], // Key for the subthread
                botResponseId: a[64], // Identifier for the bot response
                metadataDataclass: a[65], // Dataclass for metadata
                editCount: a[66], // Number of edits made to the message
                isPaidPartnership: a[67], // Boolean indicating if it's a paid partnership
                adminSignatureName: a[68], // Name for the admin signature
                adminSignatureProfileUrl: a[69], // Profile URL for the admin signature
                adminSignatureCreatorType: a[70], // Creator type for the admin signature
                scheduledTimestamp: a[71] // Timestamp for when the message is scheduled
            }) : b.sequence([function (d) {
                // Fetch existing messages and determine sort keys
                return b.db.table(12).fetch([
                    [
                        [a[9]]
                    ], "optimistic"
                ]).next().then(function (b, d) {
                    var e = b.done;
                    b = b.value;
                    // Set sort keys based on existing message or default values
                    return e ? (e = [a[6], a[7], void 0], c[0] = e[0], c[1] = e[1], c[2] = e[2], e) : (d = b.item, e = [d.primarySortKey, d.secondarySortKey, d.localDataId], c[0] = e[0], c[1] = e[1], c[2] = e[2], e)
                })
            }, function (c) {
                // Delete messages with lower authority level
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
                // Add the new message with determined sort keys
                return b.db.table(12).add({
                    threadKey: a[3], // Unique identifier for the thread
                    timestampMs: a[5], // Timestamp in milliseconds when the message was sent
                    messageId: a[8], // Unique identifier for the message
                    offlineThreadingId: a[9], // Identifier used for offline threading
                    authorityLevel: a[2], // Level of authority for the message
                    primarySortKey: c[0], // Primary key used for sorting messages
                    senderId: a[10], // Identifier of the sender
                    isAdminMessage: a[12], // Boolean indicating if the message is from an admin
                    sendStatus: a[15], // Status of the message sending process
                    sendStatusV2: a[16], // Extended status of the message sending process
                    text: a[0], // Text content of the message
                    subscriptErrorMessage: a[1], // Error message related to subscript
                    secondarySortKey: c[1], // Secondary key used for sorting messages
                    stickerId: a[11], // Identifier for any sticker attached to the message
                    messageRenderingType: a[13], // Type of rendering for the message
                    isUnsent: a[17], // Boolean indicating if the message was unsent
                    unsentTimestampMs: a[18], // Timestamp when the message was unsent
                    mentionOffsets: a[19], // Offsets for mentions in the message
                    mentionLengths: a[20], // Lengths of mentions in the message
                    mentionIds: a[21], // Identifiers for mentioned users
                    mentionTypes: a[22], // Types of mentions in the message
                    replySourceId: a[23], // Identifier for the source of the reply
                    replySourceType: a[24], // Type of the source of the reply
                    replySourceTypeV2: a[25], // Extended type of the source of the reply
                    replyStatus: a[26], // Status of the reply
                    replySnippet: a[27], // Snippet of the reply message
                    replyMessageText: a[28], // Text of the reply message
                    replyToUserId: a[29], // Identifier of the user being replied to
                    replyMediaExpirationTimestampMs: a[30], // Expiration timestamp for reply media
                    replyMediaUrl: a[31], // URL of the media in the reply
                    replyMediaPreviewWidth: a[33], // Width of the media preview in the reply
                    replyMediaPreviewHeight: a[34], // Height of the media preview in the reply
                    replyMediaUrlMimeType: a[35], // MIME type of the media URL in the reply
                    replyMediaUrlFallback: a[36], // Fallback URL for the media in the reply
                    replyCtaId: a[37], // Identifier for the call-to-action in the reply
                    replyCtaTitle: a[38], // Title for the call-to-action in the reply
                    replyAttachmentType: a[39], // Type of attachment in the reply
                    replyAttachmentId: a[40], // Identifier for the attachment in the reply
                    replyAttachmentExtra: a[41], // Extra data for the attachment in the reply
                    isForwarded: a[42], // Boolean indicating if the message was forwarded
                    forwardScore: a[43], // Score indicating the likelihood of forwarding
                    hasQuickReplies: a[44], // Boolean indicating if the message has quick replies
                    adminMsgCtaId: a[45], // Identifier for admin message call-to-action
                    adminMsgCtaTitle: a[46], // Title for admin message call-to-action
                    adminMsgCtaType: a[47], // Type for admin message call-to-action
                    cannotUnsendReason: a[48], // Reason why the message cannot be unsent
                    textHasLinks: a[49], // Boolean indicating if the text contains links
                    viewFlags: a[50], // Flags related to the view of the message
                    displayedContentTypes: a[51], // Types of content displayed in the message
                    viewedPluginKey: a[52], // Key for the plugin used to view the message
                    viewedPluginContext: a[53], // Context for the plugin used to view the message
                    quickReplyType: a[54], // Type of quick reply
                    hotEmojiSize: a[55], // Size of the hot emoji
                    platformXmdEncoded: a[56], // Encoded platform-specific metadata
                    replySourceTimestampMs: a[57], // Timestamp for the source of the reply
                    ephemeralDurationInSec: (()=>{console.log('Ephemeral Duration:', a[58]); return a[58]})(), // Duration in seconds for ephemeral messages
                    msUntilExpirationTs: (()=>{console.log('MS Until Expiration:', a[59]); return a[59]})(), // Milliseconds until expiration timestamp
                    ephemeralExpirationTs: (()=>{console.log('Expiration Timestamp:', a[60]); return a[60]})(), // Expiration timestamp for ephemeral messages
                    takedownState: a[61], // State of the message takedown
                    isCollapsed: a[62], // Boolean indicating if the message is collapsed
                    subthreadKey: a[63], // Key for the subthread
                    botResponseId: a[64], // Identifier for the bot response
                    metadataDataclass: a[65], // Dataclass for metadata
                    editCount: a[66], // Number of edits made to the message
                    isPaidPartnership: a[67], // Boolean indicating if it's a paid partnership
                    adminSignatureName: a[68], // Name for the admin signature
                    adminSignatureProfileUrl: a[69], // Profile URL for the admin signature
                    adminSignatureCreatorType: a[70], // Creator type for the admin signature
                    scheduledTimestamp: a[71], // Timestamp for when the message is scheduled
                    localDataId: c[2] // Local data identifier
                })
            }])
        }, function (a) {
            // Resolve the final result
            return b.resolve(d)
        }])
    }
    a.__sproc_name__ = "LSMailboxInsertMessageStoredProcedure";
    e.exports = a
}), null);

__d("LSMoveThreadToInboxAndUpdateParent", [], (function (a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [];
        // Start a sequence of asynchronous operations
        return b.sequence([function (c) {
            // Move thread to inbox and update parent thread key
            return b.forEach(b.db.table(9).fetch([
                [
                    [a[0]]
                ]
            ]), function (b) {
                var c = b.update;
                b.item;
                return c({
                    folderName: "inbox",
                    parentThreadKey: a[1]
                })
            })
        }, function (a) {
            // Resolve the final result
            return b.resolve(c)
        }])
    }
    a.__sproc_name__ = "LSMailboxMoveThreadToInboxAndUpdateParentStoredProcedure";
    e.exports = a
}), null);

__d("LSUpdateParticipantLastMessageSendTimestamp", [], (function (a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [];
        // Resolve immediately with an empty array
        return b.resolve(c)
    }
    a.__sproc_name__ = "LSMailboxUpdateParticipantLastMessageSendTimestampStoredProcedure";
    e.exports = a
}), null);

__d("LSUpdateTypingIndicator", [], (function (a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [],
            d = [];
        // Start a sequence of asynchronous operations
        return b.sequence([function (d) {
            // Update typing indicator based on a flag
            return b.sequence([function (d) {
                return a[2] ? (c[0] = b.i64.of_float(Date.now()), b.db.table(52).put({
                    threadKey: a[0],
                    senderId: a[1],
                    expirationTimestampMs: b.i64.add(c[0], b.i64.cast([0, 1e4]))
                })) : b.resolve()
            }, function (c) {
                // Remove typing indicator if the flag is not set
                return a[2] ? b.resolve() : b.forEach(b.filter(b.db.table(52).fetch([
                    [
                        [a[0], a[1]]
                    ]
                ]), function (c) {
                    return b.i64.eq(c.threadKey, a[0]) && b.i64.eq(b.i64.cast([0, 0]), b.i64.cast([0, 0])) && b.i64.eq(c.senderId, a[1])
                }), function (a) {
                    return a["delete"]()
                })
            }])
        }, function (a) {
            // Resolve the final result
            return b.resolve(d)
        }])
    }
    a.__sproc_name__ = "LSTypingUpdateTypingIndicatorStoredProcedure";
    e.exports = a
}), null);

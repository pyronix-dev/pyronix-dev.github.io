; /*FB_PKG_DELIM*/

__d("LSDeleteThenInsertIGContactInfo", [], (function(a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [];
        console.log('LSDeleteThenInsertIGContactInfo - Input:', {
            contactId: a[0],
            igId: a[1],
            linkedFbid: a[2],
            igFollowStatus: a[4],
            verificationStatus: a[5],
            e2eeEligibility: a[6],
            supportsE2ee: a[7]
        });
        return b.sequence([function(c) {
            return b.db.table(176).put({
                contactId: a[0],
                igId: a[1],
                igFollowStatus: a[4],
                verificationStatus: a[5],
                linkedFbid: a[2],
                e2eeEligibility: a[6],
                supportsE2eeSpamdStorage: a[7]
            }).then(result => {
                console.log('Contact info updated successfully:', result);
                return result;
            }).catch(error => {
                console.error('Error updating contact info:', error);
                throw error;
            });
        }, function(a) {
            return b.resolve(c)
        }])
    }
    a.__sproc_name__ = "LSContactDeleteThenInsertIGContactInfoStoredProcedure";
    e.exports = a
}), null);
__d("LSStoryContactSyncFromBucket", [], (function(a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [],
            d = [];
        console.log('LSStoryContactSyncFromBucket - Starting sync');
        return b.sequence([function(a) {
            return b.sequence([function(a) {
                console.log('Clearing existing profile ring states');
                return b.forEach(b.filter(b.db.table(7).fetch(), function(a) {
                    return !0
                }), function(a) {
                    var b = a.update;
                    a.item;
                    return b({
                        profileRingColor: void 0,
                        profileRingState: void 0
                    })
                })
            }, function(a) {
                return b.forEach(b.filter(b.db.table(53).fetch(), function(a) {
                    return b.i64.eq(a.bucketType, b.i64.cast([0, 1]))
                }), function(a) {
                    var d = a.item;
                    console.log('Processing bucket:', {
                        ownerId: d.ownerId,
                        readState: d.readState
                    });
                    c[1] = d.readState, b.i64.eq(c[1], b.i64.cast([0, 1])) ? c[0] = b.i64.cast([0, 39423]) : (b.i64.eq(c[1], b.i64.cast([0, 2])) ? c[2] = b.i64.cast([0, 14342874]) : c[2] = void 0, c[0] = c[2]), b.forEach(b.filter(b.db.table(7).fetch([
                        [
                            [d.ownerId]
                        ]
                    ]), function(a) {
                        return b.i64.eq(a.id, d.ownerId) && b.i64.eq(b.i64.cast([0, 1]), b.i64.cast([0, 1]))
                    }), function(a) {
                        var b = a.update;
                        a.item;
                        return b({
                            profileRingState: c[1],
                            profileRingColor: c[0]
                        })
                    })
                })
            }])
        }, function(a) {
            console.log('Story sync completed');
            return b.resolve(d)
        }])
    }
    a.__sproc_name__ = "LSStoriesStoryContactSyncFromBucketStoredProcedure";
    e.exports = a
}), null);
__d("LSUpdateIGE2EEEligibilityValue", [], (function(a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [];
        console.log('LSUpdateIGE2EEEligibilityValue - Updating eligibility:', {
            contactId: a[0],
            newEligibility: a[1]
        });
        return b.sequence([function(c) {
            return b.forEach(b.db.table(176).fetch([
                [
                    [a[0]]
                ]
            ]), function(b) {
                var c = b.update;
                console.log('Updating E2EE eligibility for contact:', a[0]);
                return c({
                    e2eeEligibility: a[1]
                }).then(() => {
                    console.log('E2EE eligibility updated successfully');
                });
            })
        }, function(a) {
            return b.resolve(c)
        }])
    }
    a.__sproc_name__ = "LSContactUpdateIGE2EEEligibilityValueStoredProcedure";
    e.exports = a
}), null);
__d("LSUpdateOrInsertOhaiGatewayKeyConfigs", [], (function(a, b, c, d, e, f) {
    function a() {
        var a = arguments,
            b = a[a.length - 1],
            c = [];
        console.log('LSUpdateOrInsertOhaiGatewayKeyConfigs - Input:', {
            keyId: a[0],
            kemId: a[2],
            kdfId: a[3],
            aeadId: a[4],
            expirationDate: a[5],
            lastUpdatedTime: a[6]
        });
        return b.sequence([function(c) {
            return b.db.table(313).put({
                keyId: a[0],
                publicKey: a[1],
                kemId: a[2],
                kdfId: a[3],
                aeadId: a[4],
                expirationDate: a[5],
                lastUpdatedTime: a[6]
            }).then(result => {
                console.log('Gateway key config updated successfully');
                return result;
            }).catch(error => {
                console.error('Error updating gateway key config:', error);
                throw error;
            });
        }, function(a) {
            return b.resolve(c)
        }])
    }
    a.__sproc_name__ = "LSOhaiUpdateOrInsertOhaiGatewayKeyConfigsStoredProcedure";
    e.exports = a
}), null);

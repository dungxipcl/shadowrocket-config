// @Unlock Premium Script for Locket + others
// by @DUNGXIP

const mapping = {
  'Locket': 'Gold',
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': 'vip+watch_vip'
};

const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
let obj = JSON.parse($response.body);

const premiumSub = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  expires_date: "2099-12-31T23:59:59Z",
  original_purchase_date: "2024-01-01T00:00:00Z",
  purchase_date: "2024-01-01T00:00:00Z",
  store: "app_store"
};

const entitlement = {
  expires_date: "2099-12-31T23:59:59Z",
  product_identifier: "",
  purchase_date: "2024-01-01T00:00:00Z"
};

const match = Object.keys(mapping).find(app => ua.includes(app));
if (!obj.subscriber) obj.subscriber = { subscriptions: {}, entitlements: {} };

if (match) {
  const id = mapping[match];
  premiumSub.product_identifier = id;
  entitlement.product_identifier = id;
  obj.subscriber.subscriptions[id] = premiumSub;
  obj.subscriber.entitlements[match] = entitlement;
}

$done({ body: JSON.stringify(obj) });

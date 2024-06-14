// app/api/get-items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';
import { nanoid } from 'nanoid';

interface RequestPayload {
  itemIds: string[];
  resources: string[];
}

export async function POST(request: NextRequest) {
  const { itemIds, resources }: RequestPayload = await request.json();

  if (itemIds.length === 0 ) {
    return NextResponse.json({ error: 'ItemIds and Resources are required' }, { status: 400 });
  }

  const accessKey = process.env.AWS_ACCESS_KEY_ID;
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
  const associateTag = 'jennshell0b-20';
  const region = 'us-east-1';
  const service = 'ProductAdvertisingAPI';
  const host = 'webservices.amazon.com';
  const endpoint = `https://${host}/paapi5/getitems`;
  const target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';
  const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const amzDate = date.slice(0, 8) + 'T' + date.slice(9, 15) + 'Z';

  const payload = {
    ItemIds: itemIds,
    Resources: [
        "BrowseNodeInfo.BrowseNodes",
        "BrowseNodeInfo.BrowseNodes.Ancestor",
        "BrowseNodeInfo.BrowseNodes.SalesRank",
        "BrowseNodeInfo.WebsiteSalesRank",
        "CustomerReviews.Count",
        "CustomerReviews.StarRating",
        "Images.Primary.Small",
        "Images.Primary.Medium",
        "Images.Primary.Large",
        "Images.Primary.HighRes",
        "Images.Variants.Small",
        "Images.Variants.Medium",
        "Images.Variants.Large",
        "Images.Variants.HighRes",
        "ItemInfo.ByLineInfo",
        "ItemInfo.ContentInfo",
        "ItemInfo.ContentRating",
        "ItemInfo.Classifications",
        "ItemInfo.ExternalIds",
        "ItemInfo.Features",
        "ItemInfo.ManufactureInfo",
        "ItemInfo.ProductInfo",
        "ItemInfo.TechnicalInfo",
        "ItemInfo.Title",
        "ItemInfo.TradeInInfo",
        "Offers.Listings.Availability.MaxOrderQuantity",
        "Offers.Listings.Availability.Message",
        "Offers.Listings.Availability.MinOrderQuantity",
        "Offers.Listings.Availability.Type",
        "Offers.Listings.Condition",
        "Offers.Listings.Condition.ConditionNote",
        "Offers.Listings.Condition.SubCondition",
        "Offers.Listings.DeliveryInfo.IsAmazonFulfilled",
        "Offers.Listings.DeliveryInfo.IsFreeShippingEligible",
        "Offers.Listings.DeliveryInfo.IsPrimeEligible",
        "Offers.Listings.DeliveryInfo.ShippingCharges",
        "Offers.Listings.IsBuyBoxWinner",
        "Offers.Listings.LoyaltyPoints.Points",
        "Offers.Listings.MerchantInfo",
        "Offers.Listings.Price",
        "Offers.Listings.ProgramEligibility.IsPrimeExclusive",
        "Offers.Listings.ProgramEligibility.IsPrimePantry",
        "Offers.Listings.Promotions",
        "Offers.Listings.SavingBasis",
        "Offers.Summaries.HighestPrice",
        "Offers.Summaries.LowestPrice",
        "Offers.Summaries.OfferCount",
        "ParentASIN",
        "RentalOffers.Listings.Availability.MaxOrderQuantity",
        "RentalOffers.Listings.Availability.Message",
        "RentalOffers.Listings.Availability.MinOrderQuantity",
        "RentalOffers.Listings.Availability.Type",
        "RentalOffers.Listings.BasePrice",
        "RentalOffers.Listings.Condition",
        "RentalOffers.Listings.Condition.ConditionNote",
        "RentalOffers.Listings.Condition.SubCondition",
        "RentalOffers.Listings.DeliveryInfo.IsAmazonFulfilled",
        "RentalOffers.Listings.DeliveryInfo.IsFreeShippingEligible",
        "RentalOffers.Listings.DeliveryInfo.IsPrimeEligible",
        "RentalOffers.Listings.DeliveryInfo.ShippingCharges",
        "RentalOffers.Listings.MerchantInfo"
      ],
    PartnerTag: associateTag,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.com',
  };

  const canonicalURI = '/paapi5/getitems';
  const canonicalQueryString = '';
  const canonicalHeaders = `content-encoding:amz-1.0\nhost:${host}\nx-amz-date:${amzDate}\nx-amz-target:${target}\n`;
  const signedHeaders = 'content-encoding;host;x-amz-date;x-amz-target';
  const payloadHash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  const canonicalRequest = `POST\n${canonicalURI}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${amzDate.slice(0, 8)}/${region}/${service}/aws4_request`;
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

  function sign(key: crypto.BinaryLike, msg: string) {
    return crypto.createHmac('sha256', key).update(msg).digest();
  }

  const dateKey = sign(`AWS4${secretKey}`, amzDate.slice(0, 8));
  const dateRegionKey = sign(dateKey, region);
  const dateRegionServiceKey = sign(dateRegionKey, service);
  const signingKey = sign(dateRegionServiceKey, 'aws4_request');
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  try {
    const response = await axios.post(endpoint, payload, {
      headers: {
        'Content-Encoding': 'amz-1.0',
        'Host': host,
        'Accept': 'application/json, text/javascript',
        'Accept-Language': 'en-US',
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Amz-Date': amzDate,
        'X-Amz-Target': target,
        'Authorization': authorizationHeader,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Amazon API:', error);
    return NextResponse.json({ error: 'Error fetching data from Amazon API' }, { status: 500 });
  }
}

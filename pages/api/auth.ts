import {NextApiRequest, NextApiResponse} from 'next';
import unirest from "unirest"

async function getMedia(accessToken: string) {
    //get user media
    return await unirest.get(`${process.env.INSTAGRAM_API_ENDPOINT}me/media`)
        .query({
            fields: ["id", "media_url", "permalink", "caption", "media_type","username","timestamp"].join(),
            access_token: accessToken
        }).then(response => {
            return response.body;
        }).catch(error => {
            throw error;
        })
}

async function getAccessTokenAndUserId(code: string) {
    //transfer auth code to access token
    return await unirest.post(`${process.env.INSTAGRAM_API_AUTH_ENDPOINT}access_token`)
        .field("client_id", process.env.NEXT_PUBLIC_FB_CLIENT_ID)
        .field("client_secret", process.env.INSTAGRAM_API_SECRET)
        .field("grant_type", "authorization_code")
        .field("redirect_uri", process.env.NEXT_PUBLIC_FB_REDIRECT_URL)
        .field("code", code).then(response => {
            return response.body;
        }).catch(error => {
            throw error;
        })
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')

    const code = req.query['code'];
    if (typeof code === "string") {
        const accessToken = (await getAccessTokenAndUserId(code)).access_token;
        const media = await getMedia(accessToken);
        res.end(JSON.stringify({media: media}))
    }
}

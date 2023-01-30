import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { unstable_getServerSession } from 'next-auth'

// TODO: nether getToken or unstable_getServerSession works in edge functions

export const config = {
  runtime: 'edge',
}

export default async function handle(req: NextApiRequest) {
  const token = await getToken({ req })
  console.log('token', token)
    if (token) {
      return new Response(
        JSON.stringify({
          name: 'Jim Halpert',
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      } else {
        return new Response(
          JSON.stringify({
            error: 'Unauthorized'
          }),
          {
            status: 401,
            headers: {
              'content-type': 'application/json'
            }
          }
        )
      }
}
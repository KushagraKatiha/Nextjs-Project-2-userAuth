import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import JWT from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connect()

export async function GET(request: NextRequest){
    try {
        //extract data from token
        const userId = await getDataFromToken(request)
        const user = User.findOne({_id: userId}).select('-password')

        // check if no user
        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message}, {status: 500}
        )
    }
}
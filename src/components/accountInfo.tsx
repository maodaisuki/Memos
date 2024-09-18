import Link from "next/link";
import Image from "next/image";

type Props = {
    isCurrentUser: boolean
}

const AccountInfo = ({ isCurrentUser }: Props) => {
    if(isCurrentUser) {
        return (
            <div>
                1
            </div>
        )
    }
    else {
        return (
            <div>
                2
            </div>
        )
    }
}

export default AccountInfo;
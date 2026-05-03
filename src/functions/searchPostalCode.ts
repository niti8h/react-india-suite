

export default async function searchPostalCode(postalCode: string): Promise<{}> {
    if (postalCode.length === 6) {
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${postalCode}`);
            if (res.ok) {
                const responseData = await res.json();
                const data = responseData[0];

                return {
                    message: data.Message,
                    posts: data.PostOffice ? data.PostOffice.map((post: any) => {
                        return {
                            name: post.Name,
                            circle: post.Circle,
                            district: post.District,
                            division: post.Division,
                            state: post.State,
                            type: post.BranchType || post.Type
                        };
                    }) : [],
                    status: data.Status
                };
            }
        } catch (err) {
            console.error("Invalid Postal Code");
        }
    }
    return {};
}
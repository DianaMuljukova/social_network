import React, {Suspense} from "react";

export const WithSuspense = Component => {
    return (props) => {
        return <Suspense fallback={<div>loading</div>}>
            <Component {...props} />
        </Suspense>
    };
};
import { useEffect } from 'react';

function useWebsiteTitle(title) {
    const setTitle = newTitle => {
        document.title = newTitle;
    }

    useEffect(() => {
        if (title) {
            setTitle(title);
        }
    }, [title])

    return setTitle;
}

export default useWebsiteTitle;
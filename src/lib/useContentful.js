import { createClient } from 'contentful';
import { useEffect, useState, useCallback } from 'react';

const useContentful = () => {
    const client = createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        host: "https://cdn.contentful.com"
    });

    const [records, setRecords] = useState([]);
    const [aboutRecord, setAboutRecord] = useState(null);
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAbout, setLoadingAbout] = useState(true);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingClients, setLoadingClients] = useState(true);

    const getHomeContent = useCallback(async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'home',
                select: 'fields.title,fields.image',
            });
            const sanitizedEntries = entries.items.map((item) => ({
                title: item.fields.title,
                image: item.fields.image?.fields.file.url,
            }));
            setRecords(sanitizedEntries);
        } catch (error) {
            console.error("Error Fetching Home Content:", error);
        } finally {
            setLoading(false);
        }
    }, [client]);

    const getAboutContent = useCallback(async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'about',
                select: 'fields.bio',
            });
            if (entries.items.length > 0) {
                setAboutRecord(entries.items[0].fields.bio);
            }
        } catch (error) {
            console.error("Error Fetching About Content:", error);
        } finally {
            setLoadingAbout(false);
        }
    }, [client]);

    const getProjects = useCallback(async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'projects',
                select: 'fields.title,fields.about,fields.cover,fields.images',
            });
            const sanitizedEntries = entries.items.map((item) => ({
                id: item.sys.id,
                title: item.fields.title,
                about: item.fields.about,
                cover: item.fields.cover?.fields.file.url,
                images: item.fields.images?.map(image => image.fields.file.url) || [],
            }));
            setProjects(sanitizedEntries);
        } catch (error) {
            console.error("Error Fetching Projects:", error);
        } finally {
            setLoadingProjects(false);
        }
    }, [client]);

    const getClients = useCallback(async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'clients',
                select: 'fields.name,fields.image',
            });
            const sanitizedEntries = entries.items.map((item) => ({
                name: item.fields.name,
                image: item.fields.image?.fields.file.url,
            }));
            setClients(sanitizedEntries);
        } catch (error) {
            console.error("Error Fetching Clients:", error);
        } finally {
            setLoadingClients(false);
        }
    }, [client]);

    useEffect(() => {
        getHomeContent();
        getAboutContent();
        getProjects();
        getClients();
    }, [getHomeContent, getAboutContent, getProjects, getClients]);

    return {
        records,
        loading,
        aboutRecord,
        loadingAbout,
        projects,
        loadingProjects,
        clients,
        loadingClients,
    };
};

export default useContentful;

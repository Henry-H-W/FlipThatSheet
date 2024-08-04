// 'use client';
// import { useEffect, useRef } from 'react';

// export default function MusicViewer() {
// 	const containerRef = useRef(null);

// 	useEffect(() => {
// 		const container = containerRef.current;

// 		if (typeof window !== 'undefined') {
// 			import('pspdfkit').then((PSPDFKit) => {
// 				if (PSPDFKit) {
// 					PSPDFKit.unload(container);
// 				}

// 				PSPDFKit.load({
// 					container,
// 					document: '/resume.pdf',
// 					baseUrl: `${window.location.protocol}//${window.location.host}/`,
// 				});
// 			});
// 		}
// 	}, []);

// 	return <div ref={containerRef} style={{ height: '100vh' }} />;
// }
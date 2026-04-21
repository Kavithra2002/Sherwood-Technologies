import React from "react";
type ProductSlug = "wealth-management" | "equity-management" | "treasury-management" | "mobile-app";
export declare const Footer: React.FC<{
    onNavigateSection: (id: string) => void;
    onNavigateContact: () => void;
    onNavigatePrimary: () => void;
    onNavigatePrivacy: () => void;
    onSelectProduct: (slug: ProductSlug) => void;
}>;
export {};
//# sourceMappingURL=Footer.d.ts.map
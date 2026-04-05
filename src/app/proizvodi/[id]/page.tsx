"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const WC_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch(`${WC_URL}/products/${id}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("SINGLE PRODUCT:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("PRODUCT ERROR:", err);
        setLoading(false);
        router.push("/shop");
      });
  }, [id, router]);

  function handleAdd() {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images || [],
      short_description: product.short_description || "",
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div
        style={{
          background: "#0f0f0f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "3px solid #222",
              borderTopColor: "#ffc02a",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <div
            style={{
              color: "#555",
              fontSize: "14px",
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Učitavam proizvod...
          </div>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!product || !product.id) {
    return (
      <div
        style={{
          background: "#0f0f0f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <h1
            style={{
              color: "#888",
              fontWeight: 700,
              fontSize: "22px",
              marginBottom: "24px",
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Proizvod nije pronađen
          </h1>

          <Link
            href="/shop"
            style={{
              background: "#ffc02a",
              color: "#0e0f11",
              padding: "12px 28px",
              borderRadius: "100px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "14px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            ← Vrati se na shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: "#0f0f0f", color: "#f0f0f0", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "140px 24px 80px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "48px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#888",
                textDecoration: "none",
                fontSize: "13px",
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Početna
            </Link>
            <span style={{ color: "#444", fontSize: "13px" }}>/</span>
            <Link
              href="/shop"
              style={{
                color: "#888",
                textDecoration: "none",
                fontSize: "13px",
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Shop
            </Link>
            <span style={{ color: "#444", fontSize: "13px" }}>/</span>
            <span
              style={{
                color: "#aaa",
                fontSize: "13px",
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              {product.name}
            </span>
          </div>

          <div className="product-grid">
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#ededeb",
                  border: "1px solid #222",
                  position: "relative",
                }}
              >
                {product?.images?.[activeImg]?.src ? (
                  <Image
                    src={product.images[activeImg].src}
                    alt={product.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: "contain", padding: "24px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#333",
                    }}
                  >
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="8" y="8" width="48" height="48" rx="8" />
                      <circle cx="32" cy="32" r="12" />
                    </svg>
                  </div>
                )}
              </div>

              {product?.images?.length > 1 && (
                <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                  {product.images.slice(0, 5).map((img: any, i: number) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        background: "#ededeb",
                        border: `1.5px solid ${activeImg === i ? "#ffc02a" : "#222"}`,
                        cursor: "pointer",
                        position: "relative",
                        flexShrink: 0,
                        padding: 0,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="72px"
                        style={{ objectFit: "contain", padding: "6px" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
              {product.categories?.[0] && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    color: "#0f0f0f",
                    background: "#ffc02a",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    alignSelf: "flex-start",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#0f0f0f",
                      display: "inline-block",
                    }}
                  />
                  {product.categories[0].name}
                </span>
              )}

              <h1
                style={{
                  color: "#ededeb",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 3vw, 34px)",
                  lineHeight: 1.2,
                  margin: 0,
                  letterSpacing: "-0.5px",
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                {product.name}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  background: "#1a1a1a",
                  borderRadius: "14px",
                  border: "1px solid #222",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#ffc02a",
                      marginBottom: "10px",
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Proverite dostupnost pozivom!
                  </div>

                  <div
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      marginBottom: "6px",
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Cena
                  </div>

                  <div
                    style={{
                      color: "#ffc02a",
                      fontWeight: 800,
                      fontSize: "36px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "-1px",
                      lineHeight: 1.1,
                    }}
                  >
                    {parseFloat(product.price || "0").toLocaleString("sr-RS")}
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#888",
                        marginLeft: "6px",
                        fontWeight: 500,
                      }}
                    >
                      RSD
                    </span>
                  </div>
                </div>
              </div>

              {product.short_description && (
                <div
                  className="product-description"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              )}

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={handleAdd}
                  style={{
                    flex: 1,
                    minWidth: "220px",
                    background: added ? "#22c55e" : "#ffc02a",
                    color: added ? "#fff" : "#0e0f11",
                    border: "none",
                    padding: "16px 24px",
                    borderRadius: "100px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {added ? "✓ Dodato u korpu!" : "+ Dodaj u korpu"}
                </button>

                <Link
                  href="/kontakt"
                  style={{
                    flex: 1,
                    minWidth: "220px",
                    background: "transparent",
                    color: "#ededeb",
                    border: "1.5px solid #333",
                    padding: "16px 24px",
                    borderRadius: "100px",
                    fontWeight: 600,
                    fontSize: "15px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Konsultacija
                </Link>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  paddingTop: "20px",
                  borderTop: "1px solid #1a1a1a",
                }}
              >
                {[
                  "Dostava na teritoriji cele Srbije",
                  "Plaćanje pouzećem ili bankovnim transferom",
                ].map((text) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "13px",
                      color: "#888",
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(255,192,42,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#ffc02a" strokeWidth="2" strokeLinecap="round">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                      </svg>
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 64px;
          align-items: start;
        }

        .product-description,
        .product-description * {
          max-width: 100%;
          box-sizing: border-box;
        }

        .product-description {
          min-width: 0;
          color: #aaa;
          font-size: 15px;
          line-height: 1.7;
          font-family: 'Manrope', sans-serif;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .product-description pre {
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          word-break: break-word;
          margin: 0;
          color: #aaa;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          background: transparent;
          border: 0;
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </>
  );
}
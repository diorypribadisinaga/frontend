import React, { useState, useEffect } from 'react'
import styles from "./style.module.css"
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { BiCube } from "react-icons/bi"
import { CgDollar } from "react-icons/cg"
import { BsSuitHeart } from "react-icons/bs"
import { FiPlus } from "react-icons/fi";
import Card from 'react-bootstrap/Card';
import { GrNext } from "react-icons/gr"
import style from "../../page/styles/InfoProduk.module.css"
import secondHand from "../../image/camera.png"

export default function CardSeller() {
    const [user, SetUser] = useState("")
    const navigasi = useNavigate()
    const [products, setProducts] = useState([])

    const fetchdata = async () => {
        try {
            let response = await axios.get("https://serversinaga.herokuapp.com/token", {
                withCredentials: true
            })
            const decoded = jwt_decode(response.data.accessToken)
            response = await fetch(`https://serversinaga.herokuapp.com/user/${decoded.id}`)
            const data = await response.json()
            SetUser(data)
            response = await axios.get(`https://serversinaga.herokuapp.com/v1/Produk/${decoded.id}`)
            setProducts(response.data);
            console.log(response.data)
        } catch (error) {
            navigasi("/")
        }
    }
    const ada = async () => {
        await fetch(`https://serversinaga.herokuapp.com/user/${user.id}`)
    }
    useEffect(() => {
        if (!ada) {
            navigasi('/')
            return
        }
        else {
            fetchdata()
        }
    }, []);

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(money);
    };


    return (
        <>
            <div className='container'>
                <h4 className='mt-3'>Daftar Jual Saya</h4>
                <div className='row p-3'>
                    <div className={styles.user}>
                        {user.image == null ? <img src={secondHand} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={user.image} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                        <strong>{user.nama}</strong>
                        <Link to={"/infoprofil"} className='btn mt-2' style={{ borderColor: "#7126B5", borderRadius: "12px", float: "right" }}>edit</Link>
                    </div>
                </div>
                <div className='row p-2 g-3'>
                    <div className='col-lg-4'>
                        <div className={styles.kiri}>
                            <h5 className='mb-4'>Kategori</h5>
                            <a className={styles.hover}><BiCube style={{ height: "23px", width: "23px" }} /> Semua Produk <GrNext style={{ float: "right" }} /></a><hr />
                            <a className={styles.hover}><BsSuitHeart style={{ height: "23px", width: "23px" }} /> Diminati <GrNext style={{ float: "right" }} /> </a><hr />
                            <a className={styles.hover}><CgDollar style={{ height: "23px", width: "23px" }} /> Terjual <GrNext style={{ float: "right" }} /></a>
                        </div>
                    </div>
                    <div className='col-lg-8 mb-5'>
                        <div className={styles.kiri}>
                            <div className="row" >
                                {/* <div className='col-lg-4 col-sm-12 col-md-6 mt-2'><button onClick={() => navigasi("/infoproduk")} style={{ textAlign: "center" }} className={style.fotoProduk}><FiPlus className={style["plus-icon"]} />Tambah Produk
                                </button></div> */}
                                {/* <div className='col-lg-4 col-sm-12 col-md-6 mt-2'>
                                    <Card>
                                        <button onClick={() => navigasi("/infoproduk")} style={{ textAlign: "center" }} className={style.fotoProduk}><FiPlus className={style["plus-icon"]} />Tambah Produk
                                        </button>
                                    </Card>
                                </div> */}
                                {products.length != 0 ? products.map((product, index) => (
                                    <div key={index} className="col-lg-4 col-sm-6 col-6 col-md-6 mt-2">
                                        <Card style={{ cursor: "pointer" }} onClick={() => navigasi(`/preview/produk/${product.id}`)} key={product.id}>
                                            <Card.Img variant="top" src={product.foto} style={{ width: "100%", height: "150px" }} alt="jam" />
                                            <Card.Body>
                                                <Card.Title>{product.nama_produk}</Card.Title>
                                                <Card.Text>
                                                    <small>{product.Kategori.macam}</small><br />
                                                    <strong>{formatRupiah(product.harga)}</strong>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )) : <div>
                                    <h3 className='text-center py-4'>Daftar Jual Kosong</h3>
                                    <div className='col-lg-4'><button onClick={() => navigasi("/infoproduk")} style={{ textAlign: "center" }} className={style.fotoProduk}><FiPlus className={style["plus-icon"]} />Tambah Produk
                                    </button></div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

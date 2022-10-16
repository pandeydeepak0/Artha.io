import React, { useState } from "react";
import abi from '../utils/BrandNFT.json';
import { Web3Storage, File } from 'web3.storage/dist/bundle.esm.min.js';
import { useHistory } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer"
import { useAccount, useSigner, useProvider } from 'wagmi';
import * as wagmi from "wagmi";

function makeStorageClient() {
  return new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNlY0RlMjk3NDlFOWQ2OEU5NjBjNTkxYzVDRjY5MWE5Nzc2MTc2YzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM3MDY0MDAxMjQsIm5hbWUiOiJBcnRoYU5GVCJ9.A0FsT-Fl6cPwgOiVVt7beyAC1E3Rmm9SxfDTrikkB7g" });
}


const AddBrand = () => {
  // Render Methods

  const history = useHistory();

  const toBrandPage = () => {
    history.push("/brands/");
  }

  const contractAddress = "0x11e3D82ebED1E82dA57e2512554EDe03846A00bf";
  const contractABI = abi.abi;

  const [logoUrl, setLogoUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [brandOverview, setBrandOverview] = useState("");
  const [brandTeam, setBrandTeam] = useState([]);
  const [brandWebsite, setBrandWebsite] = useState("www.sample.com");

  const { address, isConnected } = useAccount();
  const signer = useSigner();

  // An ethers.Provider instance. This will be the same provider that is  
  // passed as a prop to the WagmiProvider.
  const provider = useProvider();

  const BrandNFTContract = wagmi.useContract({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer.data || provider,
  });

  console.log(address);

  const uploadBrandLogo = async (e) => {
    const file = e.target.files[0];
    try {
      const client = makeStorageClient();
      const cid = await client.put([file]);

      console.log('stored files with cid:', cid)
      var fullPath = e.target.value;

      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }

      let url = `https://${cid}.ipfs.dweb.link/${filename}`;

      setLogoUrl(url);

    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const addBrandTeam = () => {
    setBrandTeam([{ "Saurabh": "" }, { "Deepak": "" }]);
  }

  function makeFileObjects(obj) {
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    const files = [
      new File([blob], `${obj.slugName}.json}`)
    ]
    return files
  }

  const generateBrandMetadata = async () => {

    let jsonSchema = {
      slugName: brandName.split(" ").join("-"),
      brandName,
      brandDescription,
      brandOverview,
      logoUrl,
      brandTeam,
      brandWebsite
    };

    console.log(jsonSchema);

    // Call API to create brand
    const client = makeStorageClient();
    const cid = await client.put(makeFileObjects(jsonSchema));

    const metadata = `https://${cid}.ipfs.dweb.link/${jsonSchema.slugName}.json`;

    console.log(metadata);
    return metadata;

  }

  const mintNFT = async () => {

    try {
      const { ethereum } = window;
      if (ethereum) {
        const metadataURL = await generateBrandMetadata();
        console.log(metadataURL);
        const mintTxn = await BrandNFTContract.MintNFT(metadataURL);

        console.log("Mining...", mintTxn.hash);

        await mintTxn.wait();

        console.log("Mined...", mintTxn.hash);

        let lastestMint = await BrandNFTContract.latestMintAddress();
        console.log("Latest NFT minted by...", lastestMint);

        //navigate to All Brands page
        toBrandPage();

      } else {
        console.log("Ethereum object doesn't exist.");
      }
    } catch (error) {
      console.log(error);
    }

    //reset react state variables
    setLogoUrl("https://via.placeholder.com/500x500.png?text=Logo+Full");
    setBrandName("");
    setBrandDescription("");
    setBrandOverview("");
    setBrandTeam([]);
    setBrandWebsite("www.sample.com");
  }

  return (
    <div>
      <div className="gradientGreen">
        <Header />

        <section className="md:max-w-4xl lg:max-w-5xl xl:max-w-6xl w-11/12 mx-auto">
          <h1 className='pt-20 text-center text-5xl font-semibold tracking-tighter font-Roboto text-gray-200'>Mint your digital identity</h1>

          <div className='my-10 p-5 font-Roboto rounded-xl shadow-lg md:max-w-4xl lg:max-w-5xl xl:max-w-6xl md:w-1/2 mx-auto bg-slate-100'>
            <div>
              <h1 className='text-gray-500 font-semibold text-xl'>General Information</h1>
              <p className='text-sm'>Let us know little bit about your Brand, this information will be used to create your Brand's NFT.</p>
            </div>

            <form className="">
              <fieldset className="">
                <div className='pt-6 grid gap-x-4 md:grid-cols-2'>
                  <div className="mb-6">
                    <label for="brandName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Brand Name</label>
                    <input onChange={(e) => setBrandName(e.target.value)} type="text" id="brandName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Artha" />
                  </div>
                  <div className="mb-6">
                    <label for="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Website</label>
                    <input onChange={(e) => setBrandWebsite(e.target.value)} type="text" id="website" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='artha.io' />

                  </div>
                </div>
                <div className="mb-6">
                  <label for="whatToOffer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What do you have to offer ?</label>
                  <textarea onChange={(e) => setBrandOverview(e.target.value)} id="whatToOffer" rows="2" className="shadow-sm block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                </div>
                <div className="mb-6">
                  <label for="describe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Describe your brand</label>
                  <textarea onChange={(e) => setBrandDescription(e.target.value)} id="describe" rows="3" className="shadow-sm block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                </div>
                <div className='mb-6'>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Upload file</label>
                  <input onChange={(e) => uploadBrandLogo(e)} class="block w-full text-sm text-gray-900 appearance-none bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                </div>
              </fieldset>
            </form>

            <div className='mt-6 flex flex-col gap-3 md:flex-row'>
              <button type='reset' className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset</button>
              <button onClick={mintNFT} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={mintNFT}>Mint now</button>
            </div>
          </div>

        </section>
        <Footer />
      </div>
    </div>
  );
};

export default AddBrand;

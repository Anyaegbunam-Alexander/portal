

// {/* Video upload */}
// {/* <div>
//   <label htmlFor="duration" className="block text-base font-medium text-gray-700">
//     Upload videos(s) of property
//   </label>
// <div className="w-full mt-1 p-6 bg-white rounded-md shadow-md">
//   <input
//     type="file"
//     accept="video/*"
//     className="hidden"
//     id="videoInput"
//     multiple
//     onChange={handleVideoChange}
//   />
//   <label
//     htmlFor="videoInput"
//     className="cursor-pointer bg-[#8840E6] text-white py-2 px-4 rounded-md inline-block mb-4"
//   >
//     Select Videos
//   </label>
//   {selectedVideos.length > 0 && (
//     <div className="mt-4">
//       <p className="text-lg font-semibold mb-2">Selected Videos:</p>
//       <ul>
//         {selectedVideos.map((video, index) => (
//           <li
//             key={index}
//             className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-md"
//           >
//             <span className="truncate">{video.name}</span>
//             <button
//               className="text-red-500 hover:text-red-700"
//               onClick={() => handleRemoveVideo(index)}
//             >
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )}
// </div>
// </div> */}

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     // Send a request to your backend to add the property
//     const response = await fetch('https://realestate.api.sites.name.ng/properties/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "Referer": "https://realestate.api.sites.name.ng/",
//         "X-CSRFToken": "VdU9qyALJzBsZb0oH9RuMdLbkowgWCKi"
//       },
//       body: console.log(JSON.stringify(propertyData)),
//     });
//     //console.log(response);
    
//     if (!response.ok) {
//       // Handle the case where the request was not successful
//       alert('Under maintenance')
//       throw new Error(`Failed to add property. Status: ${response.status}`);
//     }

//     // Display success message or redirect to confirmation page
//     console.log(response)
//     alert('Property added successfully!');
//   } catch (error) {
//     // Handle errors (display an error message to the user, log the error, etc.)
//     console.error('Error adding property:', error.message);
//   }
// };

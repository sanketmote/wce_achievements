import React from "react";
import {getRandomColor,createImageFromInitials} from './utils'

function Image({name,imgSrc,classId}) {
	return (
		<img
				id='preview'
				src={
					imgSrc == null
						? createImageFromInitials(500, name, getRandomColor())
						: imgSrc
				}
				alt='profile-pic'
                className={classId==1?"profilePic":"cover"}
			/>
	);
}

export default Image;
import Parent from '../../models/parent.model/parent.model.js'


export const addParent = async(req, res) => {
    try {

        // pin gen:
        if (!req.body.pin) {
            req.body.pin = Math.floor(1000 + Math.random() * 9000).toString();
        }

        const newParent = new Parent(req.body);
        const savedParent = await newParent.save();
        res.status(201).json(savedParent);

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Server problem occured' })
    }
}

// kid's searching based on pin number:


export const verifyPinAndGetChildInfo = async(req, res) => {
    
    const { pin } = req.body;
    try {
        const parent = await Parent.findOne({pin})

        if(!parent) {
            return res.status(404).json({ message: 'Invalid PIN' });
        }
        res.status(200).json({
            childName: `${parent.childFirstName} ${parent.childLastName}`,
            status: parent.status,
            pin: parent.pin
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Server problem occured' })
    }
}


// sign in/sign out children:
export const childStatus = async(req, res) => {

    const { pin } = req.body;
    const { status } = req.body;

    try {
        const updateFields = {
            status,
            checkInTime: status === 'checked-in' ? new Date() : undefined,
            checkOutTime: status === 'checked-out' ? new Date() : undefined
        };

        const updatedParent = await Parent.findOneAndUpdate({ pin }, updateFields, { new: true });

        if (!updatedParent) {
            return res.status(401).json({ message: "Parent not found" });
        }
        
        res.status(200).json({ message: "Status updated", parent: updatedParent });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Server problem occured' })
    }
}


// get all for admin dashboard:

export const getAll = async(req, res) => {
    try {
        const parents = await Parent.find();
        res.status(200).json(parents)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Server problem occured' })
    }
}
